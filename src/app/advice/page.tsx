import { AdviceCard } from "@/components/advice/AdviceCard";
import { ActionItemList } from "@/components/advice/ActionItemList";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { getPortfolioSnapshot } from "@/data/portfolioSnapshot";
import { generateActionItems, generateAssetAdvice, generatePortfolioAdvice } from "@/utils/adviceEngine";

export default async function AdvicePage() {
  const { computedHoldings } = await getPortfolioSnapshot();
  const portfolioAdvice = generatePortfolioAdvice(computedHoldings);
  const assetAdvice = generateAssetAdvice(computedHoldings);
  const actionItems = generateActionItems(computedHoldings);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">投资建议 Advice</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">规则驱动建议</h2>
        </div>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-950">总体组合建议</h3>
          <div className="grid gap-4 lg:grid-cols-3">
            {portfolioAdvice.map((item) => (
              <AdviceCard key={item.id} advice={item} />
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-950">资产级建议</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {assetAdvice.map((item) => (
              <AdviceCard key={item.id} advice={item} />
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-950">行动清单</h3>
          <ActionItemList items={actionItems} />
        </Card>
      </div>
    </AppLayout>
  );
}
