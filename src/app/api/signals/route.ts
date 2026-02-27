import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const SIGNAL_DIR = "/root/dev/crypto/strategy_research";

interface RawSignal {
  date?: string;
  timestamp?: string;
  price: number;
  signal: string;
  weekly_trend?: string;
  rsi?: number;
  ema_9?: number;
  ema_21?: number;
  macro_verdict?: string;
  macro_score?: number;
  macro_context?: string;
  in_position?: boolean;
  trailing_stop?: number;
  has_warning?: boolean;
  indicators?: Record<string, unknown>;
  reasoning?: string[];
  conditions?: Record<string, unknown>;
  signal_strength?: number;
  required_strength?: number;
  position_info?: { in_position?: boolean; entry_price?: number | null; trailing_stop?: number | null };
}

async function readSignalFile(filename: string): Promise<RawSignal | null> {
  try {
    const content = await readFile(path.join(SIGNAL_DIR, filename), "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function mapVerdict(signal: string): "LONG" | "SHORT" | "HOLD" {
  const s = signal.toUpperCase();
  if (s.includes("BUY") || s.includes("LONG")) return "LONG";
  if (s.includes("SELL") || s.includes("SHORT")) return "SHORT";
  return "HOLD";
}

export async function GET() {
  try {
    const [daily, trend4h, contrarian] = await Promise.all([
      readSignalFile("latest_signal.json"),
      readSignalFile("latest_signal_4h_trend.json"),
      readSignalFile("latest_signal_contrarian.json"),
    ]);

    const signals = [];

    if (daily) {
      signals.push({
        agent: "Trend Agent",
        verdict: mapVerdict(daily.signal),
        confidence: daily.rsi ? Math.round(Math.abs(50 - daily.rsi) + 30) : 45,
        reason: buildReason(daily, "1D"),
        timestamp: daily.date || "unknown",
        timeframe: "1D",
        price: daily.price,
        rsi: daily.rsi,
        macro_verdict: daily.macro_verdict,
        macro_score: daily.macro_score,
        in_position: daily.in_position,
        trailing_stop: daily.trailing_stop,
      });
    }

    if (trend4h) {
      const ind = trend4h.indicators || ({} as Record<string, unknown>);
      signals.push({
        agent: "Momentum Agent",
        verdict: mapVerdict(trend4h.signal),
        confidence: ind.rsi ? Math.round(Math.abs(50 - (ind.rsi as number)) + 30) : 40,
        reason: trend4h.reasoning?.join(" ") || `4H: ${trend4h.signal} at $${trend4h.price?.toLocaleString()}`,
        timestamp: trend4h.timestamp || "unknown",
        timeframe: "4H",
        price: trend4h.price,
        rsi: (ind.rsi as number) || null,
        in_position: trend4h.position_info?.in_position ?? false,
      });
    }

    if (contrarian) {
      signals.push({
        agent: "Contrarian Agent",
        verdict: mapVerdict(contrarian.signal),
        confidence: contrarian.signal_strength !== undefined
          ? Math.round((contrarian.signal_strength / Math.max(contrarian.required_strength || 2, 1)) * 100)
          : 35,
        reason: contrarian.reasoning?.join(" ") || `Contrarian: ${contrarian.signal}`,
        timestamp: contrarian.timestamp || "unknown",
        timeframe: "Multi",
        price: contrarian.price,
        rsi: contrarian.rsi || (contrarian.conditions?.rsi as number) || null,
      });
    }

    // Compute consensus
    const scores: Record<string, number> = {};
    signals.forEach((s) => {
      scores[s.verdict] = (scores[s.verdict] || 0) + s.confidence;
    });
    const consensus = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "HOLD";
    const avgConfidence = signals.length ? Math.round(signals.reduce((a, s) => a + s.confidence, 0) / signals.length) : 0;

    return NextResponse.json({
      signals,
      consensus,
      avgConfidence,
      lastUpdate: new Date().toISOString(),
      macro: daily ? {
        verdict: daily.macro_verdict,
        score: daily.macro_score,
        context: daily.macro_context,
      } : null,
    });
  } catch (e) {
    return NextResponse.json({ signals: [], error: String(e) });
  }
}

function buildReason(data: RawSignal, tf: string): string {
  const parts: string[] = [];
  if (data.weekly_trend) parts.push(`Weekly: ${data.weekly_trend}`);
  if (data.rsi) parts.push(`RSI: ${data.rsi.toFixed(1)}`);
  if (data.ema_9 && data.ema_21) {
    const gap = ((data.ema_9 - data.ema_21) / data.ema_21 * 100);
    parts.push(`EMA9/21 gap: ${gap.toFixed(2)}%`);
  }
  if (data.in_position) parts.push(`In position, trailing stop: $${data.trailing_stop?.toLocaleString()}`);
  else parts.push("Not in position");
  if (data.macro_verdict) parts.push(`Macro: ${data.macro_verdict}`);
  if (data.has_warning) parts.push("⚠️ Macro-technical disagreement");
  return parts.join(" | ") || `${tf} signal: ${data.signal}`;
}
