import { Card } from "@/components/ui/Card";
import type { DistributionItem } from "@/types/portfolio";
import { formatCurrency, formatPercent, getProfitClassName } from "@/utils/formatters";

export function CategorySummaryCard({ item }: { item: DistributionItem }) {
  const rate = item.costValueCny === 0 ? 0 : item.profitLossCny / item.costValueCny;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">{item.name}</h3>
          <p className="mt-1 text-xs text-slate-500">占总资产 {formatPercent(item.ratio)}</p>
        </div>
        <span className={`text-sm font-semibold ${getProfitClassName(item.profitLossCny)}`}>{formatPercent(rate)}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">市值</dt>
          <dd className="font-semibold">{formatCurrency(item.marketValueCny, "CNY")}</dd>
        </div>
        <div>
          <dt className="text-slate-500">成本</dt>
          <dd className="font-semibold">{formatCurrency(item.costValueCny, "CNY")}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-500">盈利</dt>
          <dd className={`font-semibold ${getProfitClassName(item.profitLossCny)}`}>{formatCurrency(item.profitLossCny, "CNY")}</dd>
        </div>
      </dl>
    </Card>
  );
}
