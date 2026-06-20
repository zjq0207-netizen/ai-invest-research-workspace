import { DistributionChart } from "@/components/analytics/DistributionChart";
import { IndustryChart } from "@/components/analytics/IndustryChart";
import { ProfitContributionTable } from "@/components/analytics/ProfitContributionTable";
import { RiskAlertList } from "@/components/analytics/RiskAlertList";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { getPortfolioSnapshot } from "@/data/portfolioSnapshot";
import {
  calculateCategoryDistribution,
  calculateIndustryDistribution,
  calculateMarketDistribution,
  calculateProfitContribution
} from "@/utils/calculations";
import { generateRiskAlerts } from "@/utils/adviceEngine";
import { formatCurrency, formatPercent, getProfitClassName } from "@/utils/formatters";

export default async function AnalyticsPage() {
  const { computedHoldings } = await getPortfolioSnapshot();
  const category = calculateCategoryDistribution(computedHoldings);
  const markets = calculateMarketDistribution(computedHoldings);
  const industries = calculateIndustryDistribution(computedHoldings);
  const contributions = calculateProfitContribution(computedHoldings);
  const risks = generateRiskAlerts(computedHoldings);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">资产分析 Analytics</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">分布、贡献与风险</h2>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-slate-950">资产类别分布</h3>
          <DistributionChart data={category} />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {category.map((item) => (
              <div key={item.key} className="rounded-lg bg-slate-50 p-3 text-sm">
                <div className="flex justify-between font-semibold">
                  <span>{item.name}</span>
                  <span>{formatPercent(item.ratio)}</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-slate-500">
                  <span>市值 {formatCurrency(item.marketValueCny, "CNY")}</span>
                  <span>成本 {formatCurrency(item.costValueCny, "CNY")}</span>
                  <span className={getProfitClassName(item.profitLossCny)}>盈亏 {formatCurrency(item.profitLossCny, "CNY")}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-950">市场分布</h3>
            <DistributionChart data={markets} type="bar" />
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-950">行业分布</h3>
            <IndustryChart data={industries} />
          </Card>
        </div>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-950">收益贡献分析</h3>
          <ProfitContributionTable data={contributions} />
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-950">风险提示</h3>
          <RiskAlertList alerts={risks} />
        </Card>
      </div>
    </AppLayout>
  );
}
