import { Badge } from "@/components/ui/Badge";
import { Table, Td, Th } from "@/components/ui/Table";
import type { GoldTransaction } from "@/types/portfolio";
import { formatCurrency, formatDateTime, formatNumber, getProfitClassName } from "@/utils/formatters";

function groupByBank(transactions: GoldTransaction[]) {
  return transactions.reduce<Record<string, GoldTransaction[]>>((groups, item) => {
    groups[item.bank] = groups[item.bank] ?? [];
    groups[item.bank].push(item);
    return groups;
  }, {});
}

export function GoldTransactionsTable({ transactions }: { transactions: GoldTransaction[] }) {
  const settledTransactions = transactions
    .filter((item) => item.status === "settled")
    .sort((a, b) => new Date(b.tradedAt).getTime() - new Date(a.tradedAt).getTime());
  const canceledTransactions = transactions
    .filter((item) => item.status === "canceled")
    .sort((a, b) => new Date(b.tradedAt).getTime() - new Date(a.tradedAt).getTime());
  const grouped = groupByBank(settledTransactions);

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">积存金逐笔买入记录</h3>
        <p className="mt-1 text-sm text-slate-500">按截图中的银行账户和每笔记录录入，撤单记录单独列出且不计入当前持仓。</p>
      </div>

      {Object.entries(grouped).map(([bank, items]) => {
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalValue = items.reduce((sum, item) => sum + item.currentValue, 0);
        const totalProfit = items.reduce((sum, item) => sum + item.holdingProfitLoss, 0);

        return (
          <div key={bank} className="rounded-lg bg-white shadow-soft">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-semibold text-slate-950">{bank}</h4>
                <p className="mt-1 text-sm text-slate-500">
                  克重 {formatNumber(totalQuantity)}g · 当前价值 {formatCurrency(totalValue, "CNY")}
                </p>
              </div>
              <div className={`text-sm font-semibold ${getProfitClassName(totalProfit)}`}>
                持仓收益 {formatCurrency(totalProfit, "CNY")}
              </div>
            </div>
            <div className="table-scroll overflow-x-auto">
              <Table>
                <thead className="bg-slate-50">
                  <tr>
                    <Th>银行</Th>
                    <Th>操作</Th>
                    <Th>时间</Th>
                    <Th>克重</Th>
                    <Th>当前价值</Th>
                    <Th>买入价</Th>
                    <Th>费用</Th>
                    <Th>持仓收益</Th>
                    <Th>累计收益</Th>
                    <Th>来源备注</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <Td>{item.bank}</Td>
                      <Td>
                        <Badge className="border-brand-100 bg-brand-50 text-brand-600">{item.action}</Badge>
                      </Td>
                      <Td>{formatDateTime(item.tradedAt)}</Td>
                      <Td>{formatNumber(item.quantity)}g</Td>
                      <Td>{formatCurrency(item.currentValue, item.currency)}</Td>
                      <Td>{item.buyPrice === 0 ? "-" : formatCurrency(item.buyPrice, item.currency)}</Td>
                      <Td>{formatCurrency(item.fee, item.currency)}</Td>
                      <Td className={getProfitClassName(item.holdingProfitLoss)}>{formatCurrency(item.holdingProfitLoss, item.currency)}</Td>
                      <Td className={getProfitClassName(item.cumulativeProfitLoss)}>
                        {formatCurrency(item.cumulativeProfitLoss, item.currency)}
                      </Td>
                      <Td className="max-w-xs whitespace-normal text-xs text-slate-500">{item.note}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        );
      })}

      {canceledTransactions.length > 0 && (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4">
          <h4 className="font-semibold text-slate-950">未计入持仓的撤单记录</h4>
          <div className="mt-3 table-scroll overflow-x-auto">
            <Table>
              <thead className="bg-slate-50">
                <tr>
                  <Th>银行</Th>
                  <Th>操作</Th>
                  <Th>时间</Th>
                  <Th>克重</Th>
                  <Th>委托价</Th>
                  <Th>状态</Th>
                  <Th>备注</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {canceledTransactions.map((item) => (
                  <tr key={item.id}>
                    <Td>{item.bank}</Td>
                    <Td>{item.action}</Td>
                    <Td>{formatDateTime(item.tradedAt)}</Td>
                    <Td>{formatNumber(item.quantity)}g</Td>
                    <Td>{formatCurrency(item.buyPrice, item.currency)}</Td>
                    <Td>
                      <Badge className="border-slate-200 bg-slate-50 text-slate-500">已撤单</Badge>
                    </Td>
                    <Td className="max-w-xs whitespace-normal text-xs text-slate-500">{item.note}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </section>
  );
}
