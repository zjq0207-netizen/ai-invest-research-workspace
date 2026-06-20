"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { DistributionItem } from "@/types/portfolio";
import { formatCurrency, formatPercent, getProfitClassName } from "@/utils/formatters";

const colors = {
  marketValueCny: "#2563eb",
  costValueCny: "#f97316",
  profitLossCny: "#16a34a",
  loss: "#dc2626"
};

export function CategoryDistributionChart({ data }: { data: DistributionItem[] }) {
  const chartData = data.map((item) => ({
    ...item,
    profitDisplay: Math.abs(item.profitLossCny)
  }));

  return (
    <div className="space-y-5">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} width={72} tickFormatter={(value) => `${Math.round(Number(value) / 10000)}万`} />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === "盈亏") {
                  return [formatCurrency(props.payload.profitLossCny, "CNY"), name];
                }
                return [formatCurrency(Number(value), "CNY"), name];
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            <Bar dataKey="marketValueCny" name="市值" radius={[6, 6, 0, 0]} fill={colors.marketValueCny} />
            <Bar dataKey="costValueCny" name="成本" radius={[6, 6, 0, 0]} fill={colors.costValueCny} />
            <Bar dataKey="profitDisplay" name="盈亏" radius={[6, 6, 0, 0]}>
              {chartData.map((item) => (
                <Cell key={item.key} fill={item.profitLossCny >= 0 ? colors.profitLossCny : colors.loss} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-3">品类</th>
              <th className="px-3 py-3">占比</th>
              <th className="px-3 py-3">市值</th>
              <th className="px-3 py-3">成本</th>
              <th className="px-3 py-3">盈亏</th>
              <th className="px-3 py-3">收益率</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item) => {
              const profitRate = item.costValueCny === 0 ? 0 : item.profitLossCny / item.costValueCny;
              return (
                <tr key={item.key}>
                  <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-950">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatPercent(item.ratio)}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{formatCurrency(item.marketValueCny, "CNY")}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">{formatCurrency(item.costValueCny, "CNY")}</td>
                  <td className={`whitespace-nowrap px-3 py-3 font-semibold ${getProfitClassName(item.profitLossCny)}`}>
                    {formatCurrency(item.profitLossCny, "CNY")}
                  </td>
                  <td className={`whitespace-nowrap px-3 py-3 font-semibold ${getProfitClassName(profitRate)}`}>
                    {formatPercent(profitRate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
