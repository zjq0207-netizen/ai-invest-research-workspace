"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { categoryLabels } from "@/data/mockAssets";
import { Table, Td, Th } from "@/components/ui/Table";
import type { ComputedHolding, SortDirection, SortField } from "@/types/portfolio";
import { formatCurrency, formatDateTime, formatNumber, formatPercent, getProfitClassName } from "@/utils/formatters";
import { sortHoldings } from "@/utils/calculations";

const sortableColumns: { field: SortField; label: string }[] = [
  { field: "marketValue", label: "总市值" },
  { field: "totalProfitLoss", label: "总盈亏" },
  { field: "totalProfitRate", label: "总收益率" },
  { field: "todayProfitRate", label: "今日收益率" }
];

export function HoldingsTable({
  holdings,
  showCny,
  updatedAt,
  priceSource
}: {
  holdings: ComputedHolding[];
  showCny: boolean;
  updatedAt: string;
  priceSource: "realtime" | "mock fallback";
}) {
  const [sortField, setSortField] = useState<SortField>("marketValue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sorted = useMemo(() => sortHoldings(holdings, sortField, sortDirection), [holdings, sortDirection, sortField]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-soft">
      <div className="flex flex-col gap-2 border-b border-slate-100 p-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>数据更新时间：{formatDateTime(updatedAt)}</span>
        <span>价格来源：{priceSource}</span>
      </div>
      <div className="table-scroll overflow-x-auto">
        <Table>
          <thead className="bg-slate-50">
            <tr>
              <Th>品类</Th>
              <Th>资产名称</Th>
              <Th>代码</Th>
              <Th>市场</Th>
              <Th>行业</Th>
              <Th>持仓数量</Th>
              <Th>成本均价</Th>
              <Th>现价</Th>
              <Th>今日盈亏</Th>
              <Th onClick={() => handleSort("todayProfitRate")}>
                <span className="inline-flex items-center gap-1">今日收益率 <ArrowDownUp className="h-3 w-3" /></span>
              </Th>
              <Th>总成本</Th>
              {sortableColumns.slice(0, 3).map((column) => (
                <Th key={column.field} onClick={() => handleSort(column.field)}>
                  <span className="inline-flex items-center gap-1">
                    {column.label} <ArrowDownUp className="h-3 w-3" />
                  </span>
                </Th>
              ))}
              {showCny && <Th>CNY折算市值</Th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {sorted.map((item) => (
              <tr key={item.holdingId} className="hover:bg-slate-50">
                <Td>{categoryLabels[item.asset.category]}</Td>
                <Td className="font-medium text-slate-950">{item.asset.name}</Td>
                <Td>{item.asset.ticker}</Td>
                <Td>{item.asset.market}</Td>
                <Td>{item.asset.industry}</Td>
                <Td>{formatNumber(item.quantity)}</Td>
                <Td>{formatCurrency(item.avgCost, item.asset.currency)}</Td>
                <Td>{formatCurrency(item.currentPrice, item.asset.currency)}</Td>
                <Td className={getProfitClassName(item.todayProfitLoss)}>{formatCurrency(item.todayProfitLoss, item.asset.currency)}</Td>
                <Td className={getProfitClassName(item.todayProfitRate)}>{formatPercent(item.todayProfitRate)}</Td>
                <Td>{formatCurrency(item.costValue, item.asset.currency)}</Td>
                <Td>{formatCurrency(item.marketValue, item.asset.currency)}</Td>
                <Td className={getProfitClassName(item.totalProfitLoss)}>{formatCurrency(item.totalProfitLoss, item.asset.currency)}</Td>
                <Td className={getProfitClassName(item.totalProfitRate)}>{formatPercent(item.totalProfitRate)}</Td>
                {showCny && <Td>{formatCurrency(item.marketValueCny, "CNY")}</Td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
