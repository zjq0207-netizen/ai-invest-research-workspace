import type { Asset } from "@/types/portfolio";

export const categoryLabels = {
  US_STOCK: "美股",
  HK_STOCK: "港股",
  CN_STOCK: "A股",
  GOLD: "积存金",
  OTHER: "其他"
} as const;

export const mockAssets: Asset[] = [
  {
    id: "us-dram",
    name: "Roundhill记忆体主动型ETF",
    ticker: "DRAM",
    category: "US_STOCK",
    market: "NASDAQ",
    industry: "半导体",
    currency: "USD",
    priceSourceSymbol: "DRAM.US",
    riskLevel: "medium"
  },
  {
    id: "us-litx",
    name: "Tradr每日2倍做多LITE主动型ETF",
    ticker: "LITX",
    category: "US_STOCK",
    market: "NYSE",
    industry: "新能源",
    currency: "USD",
    priceSourceSymbol: "LITX.US",
    riskLevel: "high"
  },
  {
    id: "us-qqqi",
    name: "NEOS纳斯达克100高收益主动型ETF",
    ticker: "QQQI",
    category: "US_STOCK",
    market: "NASDAQ",
    industry: "科技",
    currency: "USD",
    priceSourceSymbol: "QQQI.US",
    riskLevel: "medium"
  },
  {
    id: "us-cohx",
    name: "Tradr每日2倍做多COHR主动型ETF",
    ticker: "COHX",
    category: "US_STOCK",
    market: "NYSE",
    industry: "半导体",
    currency: "USD",
    priceSourceSymbol: "COHX.US",
    riskLevel: "high"
  },
  {
    id: "us-mu",
    name: "美光科技",
    ticker: "MU",
    category: "US_STOCK",
    market: "NASDAQ",
    industry: "半导体",
    currency: "USD",
    priceSourceSymbol: "MU.US",
    riskLevel: "medium"
  },
  {
    id: "us-astx",
    name: "Tradr每日2倍做多ASTS主动型ETF",
    ticker: "ASTX",
    category: "US_STOCK",
    market: "NYSE",
    industry: "科技",
    currency: "USD",
    priceSourceSymbol: "ASTX.US",
    riskLevel: "high"
  },
  {
    id: "us-qqq",
    name: "纳指100 ETF",
    ticker: "QQQ",
    category: "US_STOCK",
    market: "NASDAQ",
    industry: "科技",
    currency: "USD",
    priceSourceSymbol: "QQQ.US",
    riskLevel: "low"
  },
  {
    id: "us-nok",
    name: "诺基亚",
    ticker: "NOK",
    category: "US_STOCK",
    market: "NYSE",
    industry: "科技",
    currency: "USD",
    priceSourceSymbol: "NOK.US",
    riskLevel: "medium"
  },
  {
    id: "us-okll",
    name: "Defiance每日2倍做多OKLO主动型ETF",
    ticker: "OKLL",
    category: "US_STOCK",
    market: "NYSE",
    industry: "能源",
    currency: "USD",
    priceSourceSymbol: "OKLL.US",
    riskLevel: "high"
  },
  {
    id: "us-tsll",
    name: "Direxion每日2倍做多TSLA ETF",
    ticker: "TSLL",
    category: "US_STOCK",
    market: "NASDAQ",
    industry: "新能源",
    currency: "USD",
    priceSourceSymbol: "TSLL.US",
    riskLevel: "high"
  },
  {
    id: "cn-002378",
    name: "章源钨业",
    ticker: "002378",
    category: "CN_STOCK",
    market: "SZSE",
    industry: "能源",
    currency: "CNY",
    priceSourceSymbol: "sz002378",
    riskLevel: "high"
  },
  {
    id: "cn-000630",
    name: "铜陵有色",
    ticker: "000630",
    category: "CN_STOCK",
    market: "SZSE",
    industry: "能源",
    currency: "CNY",
    priceSourceSymbol: "sz000630",
    riskLevel: "medium"
  },
  {
    id: "cn-600313",
    name: "农发种业",
    ticker: "600313",
    category: "CN_STOCK",
    market: "SSE",
    industry: "消费",
    currency: "CNY",
    priceSourceSymbol: "sh600313",
    riskLevel: "medium"
  },
  {
    id: "cn-600989",
    name: "宝丰能源",
    ticker: "600989",
    category: "CN_STOCK",
    market: "SSE",
    industry: "能源",
    currency: "CNY",
    priceSourceSymbol: "sh600989",
    riskLevel: "medium"
  },
  {
    id: "cn-000960",
    name: "锡业股份",
    ticker: "000960",
    category: "CN_STOCK",
    market: "SZSE",
    industry: "能源",
    currency: "CNY",
    priceSourceSymbol: "sz000960",
    riskLevel: "medium"
  },
  {
    id: "cn-601899",
    name: "紫金矿业",
    ticker: "601899",
    category: "CN_STOCK",
    market: "SSE",
    industry: "能源",
    currency: "CNY",
    priceSourceSymbol: "sh601899",
    riskLevel: "medium"
  },
  {
    id: "gold-icbc",
    name: "工商银行积存金",
    ticker: "AU-ICBC",
    category: "GOLD",
    market: "GOLD",
    industry: "贵金属",
    currency: "CNY",
    priceSourceSymbol: "XAU-CNY-ICBC",
    riskLevel: "low"
  },
  {
    id: "gold-cmbc",
    name: "民生银行积存金",
    ticker: "AU-CMBC",
    category: "GOLD",
    market: "GOLD",
    industry: "贵金属",
    currency: "CNY",
    priceSourceSymbol: "XAU-CNY-CMBC",
    riskLevel: "low"
  },
  {
    id: "gold-cmb",
    name: "招商银行积存金",
    ticker: "AU-CMB",
    category: "GOLD",
    market: "GOLD",
    industry: "贵金属",
    currency: "CNY",
    priceSourceSymbol: "XAU-CNY-CMB",
    riskLevel: "low"
  },
  {
    id: "gold-czb",
    name: "浙商银行积存金",
    ticker: "AU-CZB",
    category: "GOLD",
    market: "GOLD",
    industry: "贵金属",
    currency: "CNY",
    priceSourceSymbol: "XAU-CNY-CZB",
    riskLevel: "low"
  }
];
