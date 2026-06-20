import { MetricCard } from "@/components/dashboard/MetricCard";
import type { Currency } from "@/types/portfolio";
import { formatCurrency, formatPercent, getProfitClassName } from "@/utils/formatters";
import { Card } from "@/components/ui/Card";

export function FilteredSummaryCards({
  summary
}: {
  summary: {
    totalMarketValue: number;
    totalCostValue: number;
    totalProfitLoss: number;
    totalProfitRate: number;
    currency: Currency;
  };
}) {
  if (summary.currency === "CNY") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
        <MetricCard title="总持仓市值" value={summary.totalMarketValue} />
        <MetricCard title="总持仓成本" value={summary.totalCostValue} />
        <MetricCard title="总盈利" value={summary.totalProfitLoss} highlight />
        <MetricCard title="总收益率" value={summary.totalProfitRate} type="percent" highlight />
      </div>
    );
  }

  const items = [
    ["总持仓市值", formatCurrency(summary.totalMarketValue, summary.currency)],
    ["总持仓成本", formatCurrency(summary.totalCostValue, summary.currency)],
    ["总盈利", formatCurrency(summary.totalProfitLoss, summary.currency)],
    ["总收益率", formatPercent(summary.totalProfitRate)]
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
      {items.map(([label, value], index) => (
        <Card className="p-4" key={label}>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={`mt-3 text-2xl font-bold ${index >= 2 ? getProfitClassName(summary.totalProfitLoss) : "text-slate-950"}`}>
            {value}
          </p>
        </Card>
      ))}
    </div>
  );
}
