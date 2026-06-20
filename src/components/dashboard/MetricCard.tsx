import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent, getProfitClassName } from "@/utils/formatters";

export function MetricCard({
  title,
  value,
  type = "currency",
  highlight = false
}: {
  title: string;
  value: number;
  type?: "currency" | "percent";
  highlight?: boolean;
}) {
  return (
    <Card className="p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`mt-3 text-2xl font-bold ${highlight ? getProfitClassName(value) : "text-slate-950"}`}>
        {type === "percent" ? formatPercent(value) : formatCurrency(value, "CNY")}
      </p>
    </Card>
  );
}
