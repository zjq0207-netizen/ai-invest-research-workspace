import {
  calculateIndustryDistribution,
  calculateMarketDistribution
} from "@/utils/calculations";
import type { Advice, ComputedHolding, RiskAlert, RiskLevel } from "@/types/portfolio";

const LIMITS = {
  assetPosition: 0.2,
  marketPosition: 0.7,
  industryPosition: 0.4,
  takeProfit: 0.3,
  reviewLoss: -0.2,
  dailyDrop: -0.05
};

function levelForRatio(ratio: number): RiskLevel {
  if (ratio >= 0.7) return "high";
  if (ratio >= 0.4) return "medium";
  return "low";
}

export function generateRiskAlerts(computedHoldings: ComputedHolding[]): RiskAlert[] {
  const alerts: RiskAlert[] = [];

  computedHoldings.forEach((item) => {
    if (item.positionRatio > LIMITS.assetPosition) {
      alerts.push({
        id: `risk-position-${item.holdingId}`,
        level: "high",
        title: "单一资产集中度偏高",
        content: `${item.asset.name} 占组合比例超过 20%，后续买入前建议先评估组合承载能力。`,
        relatedAssetId: item.asset.id,
        triggerRule: "单一资产占比 > 20%"
      });
    }
    if (item.totalProfitRate < LIMITS.reviewLoss) {
      alerts.push({
        id: `risk-loss-${item.holdingId}`,
        level: "medium",
        title: "亏损持仓需要复盘",
        content: `${item.asset.name} 总收益率低于 -20%，建议检查买入逻辑、仓位和止损纪律。`,
        relatedAssetId: item.asset.id,
        triggerRule: "单个资产收益率 < -20%"
      });
    }
    if (item.totalProfitRate > LIMITS.takeProfit) {
      alerts.push({
        id: `risk-profit-${item.holdingId}`,
        level: "low",
        title: "高收益持仓进入观察区",
        content: `${item.asset.name} 总收益率超过 30%，可以考虑分批止盈或上移保护线。`,
        relatedAssetId: item.asset.id,
        triggerRule: "单个资产收益率 > 30%"
      });
    }
    if (item.todayProfitRate < LIMITS.dailyDrop) {
      alerts.push({
        id: `risk-day-${item.holdingId}`,
        level: "medium",
        title: "短期波动放大",
        content: `${item.asset.name} 今日跌幅超过 5%，建议关注是否由基本面或事件驱动。`,
        relatedAssetId: item.asset.id,
        triggerRule: "单个资产今日跌幅 < -5%"
      });
    }
  });

  calculateMarketDistribution(computedHoldings).forEach((item) => {
    if (item.ratio > LIMITS.marketPosition) {
      alerts.push({
        id: `risk-market-${item.key}`,
        level: "high",
        title: "市场集中风险",
        content: `${item.name} 市场占比超过 70%，组合对单一市场波动较敏感。`,
        triggerRule: "单一市场占比 > 70%"
      });
    }
  });

  calculateIndustryDistribution(computedHoldings).forEach((item) => {
    if (item.ratio > LIMITS.industryPosition) {
      alerts.push({
        id: `risk-industry-${item.key}`,
        level: levelForRatio(item.ratio),
        title: "行业集中风险",
        content: `${item.name} 行业占比超过 40%，建议控制新增同方向资产。`,
        triggerRule: "单一行业占比 > 40%"
      });
    }
  });

  return alerts;
}

export function generatePortfolioAdvice(computedHoldings: ComputedHolding[]): Advice[] {
  const market = calculateMarketDistribution(computedHoldings)[0];
  const industry = calculateIndustryDistribution(computedHoldings)[0];
  const riskyCount = computedHoldings.filter((item) => item.asset.riskLevel === "high").length;
  const now = new Date().toISOString();

  return [
    {
      id: "portfolio-style",
      type: "portfolio",
      level: riskyCount >= 3 ? "medium" : "low",
      title: riskyCount >= 3 ? "当前组合偏进攻型" : "当前组合偏均衡观察型",
      content: `组合中高波动资产有 ${riskyCount} 个，建议新增仓位优先考虑已有风险暴露是否过高。`,
      triggerRule: "按资产风险等级统计",
      createdAt: now
    },
    {
      id: "portfolio-market",
      type: "portfolio",
      level: market?.ratio > 0.7 ? "high" : "medium",
      title: "关注市场分散",
      content: market ? `${market.name} 是当前第一大市场，后续可关注不同市场和品类的分散配置。` : "暂无市场数据。",
      triggerRule: "最大市场占比",
      createdAt: now
    },
    {
      id: "portfolio-industry",
      type: "portfolio",
      level: industry?.ratio > 0.4 ? "medium" : "low",
      title: "关注行业暴露",
      content: industry ? `${industry.name} 是当前第一大行业，避免连续加仓同方向高波动资产。` : "暂无行业数据。",
      triggerRule: "最大行业占比",
      createdAt: now
    }
  ];
}

export function generateAssetAdvice(computedHoldings: ComputedHolding[]): Advice[] {
  const now = new Date().toISOString();
  return computedHoldings.map((item) => {
    if (item.positionRatio > LIMITS.assetPosition) {
      return {
        id: `advice-position-${item.holdingId}`,
        type: "asset",
        level: "high",
        title: "控制新增买入",
        content: `${item.asset.name} 仓位超过 20%，优先观察而不是继续抬高集中度。`,
        relatedAssetId: item.asset.id,
        triggerRule: "仓位超过 20%",
        createdAt: now
      } satisfies Advice;
    }
    if (item.totalProfitRate > LIMITS.takeProfit) {
      return {
        id: `advice-profit-${item.holdingId}`,
        type: "asset",
        level: "low",
        title: "进入止盈观察区",
        content: `${item.asset.name} 收益率高于 30%，可以设置分批止盈或移动止盈条件。`,
        relatedAssetId: item.asset.id,
        triggerRule: "总收益率高于 30%",
        createdAt: now
      } satisfies Advice;
    }
    if (item.totalProfitRate < LIMITS.reviewLoss) {
      return {
        id: `advice-loss-${item.holdingId}`,
        type: "asset",
        level: "medium",
        title: "进入亏损复盘区",
        content: `${item.asset.name} 亏损超过 20%，建议明确是继续持有、减仓还是等待反弹处理。`,
        relatedAssetId: item.asset.id,
        triggerRule: "总收益率低于 -20%",
        createdAt: now
      } satisfies Advice;
    }
    if (item.todayProfitRate < LIMITS.dailyDrop) {
      return {
        id: `advice-daily-${item.holdingId}`,
        type: "asset",
        level: "medium",
        title: "关注短期波动",
        content: `${item.asset.name} 今日跌幅超过 5%，短线波动需单独跟踪。`,
        relatedAssetId: item.asset.id,
        triggerRule: "今日跌幅超过 5%",
        createdAt: now
      } satisfies Advice;
    }
    return {
      id: `advice-hold-${item.holdingId}`,
      type: "asset",
      level: "low",
      title: "继续观察或持有",
      content: `${item.asset.name} 当前仓位和收益状态未触发极端规则，维持跟踪即可。`,
      relatedAssetId: item.asset.id,
      triggerRule: "仓位合理且收益稳定",
      createdAt: now
    } satisfies Advice;
  });
}

export function generateActionItems(computedHoldings: ComputedHolding[]): Advice[] {
  const now = new Date().toISOString();
  const actions = [
    "检查仓位超过 20% 的资产，先确认是否需要限制新增买入。",
    "复盘亏损超过 20% 的持仓，记录当初买入理由是否仍成立。",
    "关注今日跌幅较大的资产，区分正常波动和基本面变化。",
    "控制单一行业风险暴露，避免连续买入同一主题。",
    "优化美股、港股、A股、积存金和其他资产之间的配置比例。"
  ];

  return actions.slice(0, 5).map((content, index) => ({
    id: `action-${index + 1}`,
    type: "action",
    level: index === 0 ? "medium" : "low",
    title: `行动 ${index + 1}`,
    content,
    triggerRule: "规则驱动行动清单",
    createdAt: now
  }));
}
