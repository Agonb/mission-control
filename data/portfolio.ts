export interface PortfolioAsset {
  id: string;
  coin: string;
  symbol: string;
  amount: number;
  valueUsd: number;
}

const rawAssets: Omit<PortfolioAsset, "id">[] = [
  { coin: "Tether", symbol: "USDT", amount: 1151, valueUsd: 1151 },
  { coin: "Dogecoin", symbol: "DOGE", amount: 975, valueUsd: 975 },
  { coin: "Ethereum", symbol: "ETH", amount: 0.08, valueUsd: 200 },
  { coin: "Bitcoin", symbol: "BTC", amount: 0.003, valueUsd: 300 },
  { coin: "Internet Computer", symbol: "ICP", amount: 18.5, valueUsd: 150 },
  { coin: "Hedera", symbol: "HBAR", amount: 1000, valueUsd: 100 },
];

export const portfolioAssets: PortfolioAsset[] = rawAssets.map((a, i) => ({
  ...a,
  id: String(i + 1),
}));

export const totalPortfolioValue = portfolioAssets.reduce(
  (sum, a) => sum + a.valueUsd,
  0
);
