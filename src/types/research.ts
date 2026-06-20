export type Rating = "强关注" | "关注" | "中性" | "谨慎" | "回避";

export type InvestmentStyle = "短线交易" | "波段交易" | "中长期配置" | "防守观察";

export interface ScoreFactors {
  industry: number;
  chainPosition: number;
  company: number;
  financial: number;
  growth: number;
  valuation: number;
  technical: number;
  capital: number;
  riskPenalty: number;
}

export interface StockResearchProfile {
  symbol: string;
  name: string;
  market: string;
  industry: string;
  price: number;
  changePercent: number;
  marketCap: string;
  businessModel: string;
  coreLogic: string[];
  financial: {
    revenueGrowth: number;
    netProfitGrowth: number;
    grossMargin: number;
    roe: number;
    freeCashFlowQuality: "高" | "中" | "低";
    debtToAsset: number;
  };
  valuation: {
    pe: number;
    pb: number;
    pePercentile5y: number;
    peerMedianPe: number;
    status: "低估" | "合理" | "偏高" | "高估";
  };
  technical: {
    trend: "多头" | "震荡" | "空头";
    momentum: "增强" | "衰减" | "背离";
    support: number;
    resistance: number;
    atrRisk: "低" | "中" | "高";
  };
  capital: {
    volumeSignal: "放量" | "平量" | "缩量";
    sectorLinkage: "强" | "中" | "弱";
    pricingStatus: "未定价" | "初步定价" | "充分定价" | "过度定价" | "反向定价";
  };
  catalysts: string[];
  risks: string[];
  invalidation: string[];
  tracking: string[];
  scoreFactors: ScoreFactors;
}

export interface IndustryNode {
  level: "上游" | "中游" | "下游" | "基础设施" | "应用";
  name: string;
  prosperity: "高" | "中" | "低";
  competition: "寡头" | "集中" | "分散" | "新进入者多";
  profitElasticity: "高" | "中" | "低";
  valuationState: "低估" | "合理" | "偏高" | "高估";
  representativeCompanies: string[];
  risks: string[];
}

export interface IndustryChain {
  name: string;
  prosperityScore: number;
  conclusion: string;
  nodes: IndustryNode[];
}

export interface NewsEvent {
  id: string;
  title: string;
  body: string;
  eventType: string;
  impactDirection: "利好" | "利空" | "中性" | "短期扰动";
  impactStrength: "一次性" | "持续性" | "结构性";
  pricingStatus: "未定价" | "初步定价" | "充分定价" | "过度定价" | "反向定价";
  entities: string[];
  directBeneficiaries: string[];
  indirectBeneficiaries: string[];
  fakeBeneficiaries: string[];
  path: string[];
  risks: string[];
  invalidation: string[];
}

export interface ResearchReport {
  id: string;
  title: string;
  subject: string;
  reportType: "个股深度" | "新闻拆解" | "行业链条" | "横向对比";
  rating: Rating;
  score: number;
  oneLineConclusion: string;
  logic: string[];
  evidence: string[];
  risks: string[];
  invalidation: string[];
  tracking: string[];
  generatedAt: string;
}
