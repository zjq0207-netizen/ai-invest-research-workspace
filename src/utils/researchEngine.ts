import { aiInfrastructureChain, newsEvents, stockProfiles } from "@/data/researchData";
import type { NewsEvent, Rating, ResearchReport, ScoreFactors, StockResearchProfile } from "@/types/research";

const weights: Record<keyof ScoreFactors, number> = {
  industry: 0.15,
  chainPosition: 0.1,
  company: 0.15,
  financial: 0.15,
  growth: 0.1,
  valuation: 0.15,
  technical: 0.1,
  capital: 0.05,
  riskPenalty: -0.05
};

export function calculateInvestmentScore(factors: ScoreFactors) {
  const total = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + factors[key as keyof ScoreFactors] * weight;
  }, 0);

  const score = Math.max(0, Math.min(100, Math.round(total)));
  return {
    score,
    rating: getRating(score)
  };
}

export function getRating(score: number): Rating {
  if (score >= 85) return "强关注";
  if (score >= 70) return "关注";
  if (score >= 55) return "中性";
  if (score >= 40) return "谨慎";
  return "回避";
}

export function getStockProfile(symbol: string) {
  const normalized = symbol.trim().toUpperCase();
  return stockProfiles.find((stock) => stock.symbol.toUpperCase() === normalized) ?? stockProfiles[0];
}

export function buildStockReport(stock: StockResearchProfile): ResearchReport {
  const { score, rating } = calculateInvestmentScore(stock.scoreFactors);
  const valuationPhrase =
    stock.valuation.status === "高估" || stock.valuation.status === "偏高"
      ? "估值已反映较多乐观预期"
      : "估值仍处在可跟踪区间";

  return {
    id: `stock-${stock.symbol}`,
    title: `${stock.name} 投资分析报告`,
    subject: `${stock.name} ${stock.symbol}`,
    reportType: "个股深度",
    rating,
    score,
    oneLineConclusion: `${stock.name} 属于${stock.industry}方向的${rating}标的，${valuationPhrase}，后续关键在于业绩和催化剂兑现。`,
    logic: stock.coreLogic,
    evidence: [
      `营收增速 ${stock.financial.revenueGrowth}%，净利润增速 ${stock.financial.netProfitGrowth}%。`,
      `当前 PE ${stock.valuation.pe}，近 5 年 PE 分位 ${stock.valuation.pePercentile5y}%。`,
      `技术趋势为${stock.technical.trend}，支撑位 ${stock.technical.support}，压力位 ${stock.technical.resistance}。`,
      `市场定价程度：${stock.capital.pricingStatus}。`
    ],
    risks: stock.risks,
    invalidation: stock.invalidation,
    tracking: stock.tracking,
    generatedAt: "2026-06-20"
  };
}

export function getDefaultNewsEvent(): NewsEvent {
  return newsEvents[0];
}

export function buildNewsReport(event: NewsEvent): ResearchReport {
  const score = event.pricingStatus === "过度定价" ? 58 : event.pricingStatus === "充分定价" ? 66 : 76;
  const rating = getRating(score);

  return {
    id: `news-${event.id}`,
    title: `${event.title} 事件拆解`,
    subject: event.title,
    reportType: "新闻拆解",
    rating,
    score,
    oneLineConclusion: `该事件属于${event.eventType}，对${event.entities.join("、")}偏${event.impactDirection}，当前市场处于${event.pricingStatus}阶段。`,
    logic: [
      `影响路径：${event.path.join(" → ")}。`,
      `直接受益：${event.directBeneficiaries.join("、")}。`,
      `间接受益：${event.indirectBeneficiaries.join("、")}。`,
      `需要区分真实订单受益和单纯概念映射。`
    ],
    evidence: [
      `事件强度：${event.impactStrength}。`,
      `影响方向：${event.impactDirection}。`,
      `市场定价程度：${event.pricingStatus}。`
    ],
    risks: event.risks,
    invalidation: event.invalidation,
    tracking: ["后续订单公告", "板块成交量", "龙头与跟随标的强弱", "财报毛利率验证"],
    generatedAt: "2026-06-20"
  };
}

export function buildIndustryReport(): ResearchReport {
  const score = aiInfrastructureChain.prosperityScore;
  const rating = getRating(score);
  const highProsperityNodes = aiInfrastructureChain.nodes.filter((node) => node.prosperity === "高");

  return {
    id: "industry-ai-infra",
    title: "AI 基础设施产业链分析",
    subject: aiInfrastructureChain.name,
    reportType: "行业链条",
    rating,
    score,
    oneLineConclusion: aiInfrastructureChain.conclusion,
    logic: highProsperityNodes.map((node) => `${node.name}处于高景气，利润弹性${node.profitElasticity}，估值状态${node.valuationState}。`),
    evidence: aiInfrastructureChain.nodes.map((node) => `${node.level}：${node.name}，代表公司 ${node.representativeCompanies.join("、")}。`),
    risks: Array.from(new Set(aiInfrastructureChain.nodes.flatMap((node) => node.risks))).slice(0, 5),
    invalidation: ["云厂商资本开支下修", "AI 训练需求放缓", "核心环节价格竞争加剧", "估值消化慢于盈利兑现"],
    tracking: ["云厂商 CapEx", "GPU 交付周期", "光模块价格", "数据中心电力建设进度"],
    generatedAt: "2026-06-20"
  };
}

export function getAllReports() {
  return [
    buildStockReport(stockProfiles[0]),
    buildNewsReport(newsEvents[0]),
    buildIndustryReport(),
    buildStockReport(stockProfiles[1])
  ];
}

export function getIndustryChain() {
  return aiInfrastructureChain;
}

export function compareStocks() {
  return stockProfiles.map((stock) => {
    const result = calculateInvestmentScore(stock.scoreFactors);
    return {
      ...stock,
      ...result
    };
  });
}
