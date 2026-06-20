export type AssetCategory = "US_STOCK" | "HK_STOCK" | "CN_STOCK" | "GOLD" | "OTHER";

export type Currency = "CNY" | "USD" | "HKD";

export type RiskLevel = "high" | "medium" | "low";

export type AdviceType = "portfolio" | "asset" | "action";

export type Market =
  | "NASDAQ"
  | "NYSE"
  | "HKEX"
  | "SSE"
  | "SZSE"
  | "GOLD"
  | "OTHER";

export interface Asset {
  id: string;
  name: string;
  ticker: string;
  category: AssetCategory;
  market: Market;
  industry: string;
  currency: Currency;
  priceSourceSymbol: string;
  riskLevel: RiskLevel;
}

export interface Holding {
  id: string;
  assetId: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  previousClose: number;
  currency: Currency;
  account: string;
  note: string;
  updatedAt: string;
}

export type GoldTransactionStatus = "settled" | "canceled";

export interface GoldTransaction {
  id: string;
  bank: string;
  assetId: string;
  action: "实时买入" | "限价买入" | "委托买入" | "生息" | "活期结息";
  status: GoldTransactionStatus;
  tradedAt: string;
  quantity: number;
  currentValue: number;
  buyPrice: number;
  fee: number;
  holdingProfitLoss: number;
  cumulativeProfitLoss: number;
  currency: Currency;
  note?: string;
}

export interface ComputedHolding {
  holdingId: string;
  asset: Asset;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  previousClose: number;
  todayProfitLoss: number;
  todayProfitRate: number;
  costValue: number;
  marketValue: number;
  totalProfitLoss: number;
  totalProfitRate: number;
  marketValueCny: number;
  costValueCny: number;
  totalProfitLossCny: number;
  positionRatio: number;
}

export interface ExchangeRate {
  from: Currency;
  to: Currency;
  rate: number;
  updatedAt: string;
}

export interface PortfolioSummary {
  totalMarketValueCny: number;
  totalCostValueCny: number;
  totalProfitLossCny: number;
  totalProfitRate: number;
}

export interface Advice {
  id: string;
  type: AdviceType;
  level: RiskLevel;
  title: string;
  content: string;
  relatedAssetId?: string;
  triggerRule: string;
  createdAt: string;
}

export interface RiskAlert {
  id: string;
  level: RiskLevel;
  title: string;
  content: string;
  relatedAssetId?: string;
  triggerRule: string;
}

export interface DistributionItem {
  key: string;
  name: string;
  marketValueCny: number;
  costValueCny: number;
  profitLossCny: number;
  ratio: number;
}

export interface PriceQuote {
  price: number;
  previousClose?: number;
  source: "realtime" | "mock fallback";
  updatedAt: string;
}

export type SortField = "totalProfitRate" | "totalProfitLoss" | "marketValue" | "todayProfitRate";
export type SortDirection = "asc" | "desc";
