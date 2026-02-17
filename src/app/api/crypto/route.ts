import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SYMBOLS = ["BTC", "ETH", "DOGE", "RENDER", "ICP", "FET", "HBAR", "PEPE", "WOO"];

export async function GET() {
  try {
    const pairs = SYMBOLS.map((s) => `"${s}USDT"`).join(",");
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=[${pairs}]`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();

    const coins = data.map((d: any) => ({
      symbol: d.symbol.replace("USDT", ""),
      price: parseFloat(d.lastPrice) >= 1
        ? parseFloat(d.lastPrice).toLocaleString("en-US", { maximumFractionDigits: 2 })
        : parseFloat(d.lastPrice).toPrecision(4),
      change24h: parseFloat(d.priceChangePercent),
    }));

    return NextResponse.json({ coins });
  } catch {
    return NextResponse.json({ coins: [] });
  }
}
