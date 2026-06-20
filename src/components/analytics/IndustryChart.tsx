"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DistributionItem } from "@/types/portfolio";
import { formatCurrency } from "@/utils/formatters";

export function IndustryChart({ data }: { data: DistributionItem[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(Number(value), "CNY")} />
          <Bar dataKey="marketValueCny" name="市值" radius={[6, 6, 0, 0]}>
            {data.map((item) => (
              <Cell key={item.key} fill={item.profitLossCny >= 0 ? "#16a34a" : "#dc2626"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
