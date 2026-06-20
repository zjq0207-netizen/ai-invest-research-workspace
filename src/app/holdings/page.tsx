import { HoldingsView } from "@/components/holdings/HoldingsView";
import { AppLayout } from "@/components/layout/AppLayout";
import { getPortfolioSnapshot } from "@/data/portfolioSnapshot";
import type { AssetCategory } from "@/types/portfolio";

const validCategories: Array<AssetCategory | "ALL"> = ["ALL", "US_STOCK", "HK_STOCK", "CN_STOCK", "GOLD", "OTHER"];

export default async function HoldingsPage({
  searchParams
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const { computedHoldings, priceSource } = await getPortfolioSnapshot();
  const requestedCategory = searchParams?.category ?? "ALL";
  const initialCategory = validCategories.includes(requestedCategory as AssetCategory | "ALL")
    ? (requestedCategory as AssetCategory | "ALL")
    : "ALL";

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">持仓明细 Holdings</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">按品类筛选与排序</h2>
        </div>
        <HoldingsView holdings={computedHoldings} priceSource={priceSource} initialCategory={initialCategory} />
      </div>
    </AppLayout>
  );
}
