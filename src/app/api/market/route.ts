import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fear & Greed
    const fgRes = await fetch("https://api.alternative.me/fng/?limit=1", { next: { revalidate: 900 } });
    const fgData = await fgRes.json();
    const fg = fgData?.data?.[0];

    // BTC global data
    const globalRes = await fetch("https://api.coingecko.com/api/v3/global", { next: { revalidate: 900 } });
    const globalData = await globalRes.json();
    const gd = globalData?.data;

    return NextResponse.json({
      fearGreed: fg ? parseInt(fg.value) : 50,
      fearGreedLabel: fg?.value_classification || "Neutral",
      btcDominance: gd?.market_cap_percentage?.btc?.toFixed(1) || "61.0",
      totalMarketCap: gd?.total_market_cap?.usd ? `$${(gd.total_market_cap.usd / 1e12).toFixed(1)}T` : "—",
      funding: 0.01, // TODO: connect to exchange API
    });
  } catch {
    return NextResponse.json({
      fearGreed: 50,
      fearGreedLabel: "Neutral",
      btcDominance: "61.0",
      totalMarketCap: "—",
      funding: 0.01,
    });
  }
}
