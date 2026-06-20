"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DistributionItem } from "@/types/portfolio";
import { formatCurrency, formatPercent } from "@/utils/formatters";

const colors = ["#f97316", "#2563eb", "#16a34a", "#ca8a04", "#64748b", "#9333ea", "#0f766e"];

export function DistributionChart({ data, type = "pie" }: { data: DistributionItem[]; type?: "pie" | "bar" }) {
  if (type === "bar") {
    return (
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatCurrency(Number(value), "CNY")} />
            <Bar dataKey="marketValueCny" radius={[6, 6, 0, 0]}>
              {data.map((item, index) => (
                <Cell key={item.key} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="marketValueCny" nameKey="name" outerRadius="80%" innerRadius="50%">
            {data.map((item, index) => (
              <Cell key={item.key} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${formatCurrency(Number(value), "CNY")} / ${formatPercent(props.payload.ratio)}`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
