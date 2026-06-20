import { Table, Td, Th } from "@/components/ui/Table";
import type { ComputedHolding } from "@/types/portfolio";
import { categoryLabels } from "@/data/mockAssets";
import { formatCurrency, formatPercent, getProfitClassName } from "@/utils/formatters";

export function ProfitContributionTable({ data }: { data: Array<ComputedHolding & { contributionRatio: number }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <Table>
        <thead className="bg-slate-50">
          <tr>
            <Th>资产名称</Th>
            <Th>代码</Th>
            <Th>品类</Th>
            <Th>总盈亏</Th>
            <Th>收益贡献占比</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.holdingId}>
              <Td className="font-medium text-slate-950">{item.asset.name}</Td>
              <Td>{item.asset.ticker}</Td>
              <Td>{categoryLabels[item.asset.category]}</Td>
              <Td className={getProfitClassName(item.totalProfitLossCny)}>{formatCurrency(item.totalProfitLossCny, "CNY")}</Td>
              <Td className={getProfitClassName(item.contributionRatio)}>{formatPercent(item.contributionRatio)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
