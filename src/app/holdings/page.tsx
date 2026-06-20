import { HoldingsView } from "@/components/holdings/HoldingsView";
import { AppLayout } from "@/components/layout/AppLayout";
import { getPortfolioSnapshot } from "@/data/portfolioSnapshot";

export default async function HoldingsPage() {
  const { computedHoldings, priceSource } = await getPortfolioSnapshot();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">持仓明细 Holdings</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">按品类筛选与排序</h2>
        </div>
        <HoldingsView holdings={computedHoldings} priceSource={priceSource} />
      </div>
    </AppLayout>
  );
}
