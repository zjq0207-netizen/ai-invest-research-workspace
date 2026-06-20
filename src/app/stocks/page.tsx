import { Activity, Building2, CandlestickChart, CircleDollarSign } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { FactorBars } from "@/components/research/FactorBars";
import { InsightList } from "@/components/research/InsightList";
import { ScoreBadge } from "@/components/research/ScoreBadge";
import { buildStockReport, calculateInvestmentScore, compareStocks, getStockProfile } from "@/utils/researchEngine";

export default function StocksPage() {
  const stock = getStockProfile("NVDA");
  const report = buildStockReport(stock);
  const score = calculateInvestmentScore(stock.scoreFactors);
  const peers = compareStocks();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">Stock Research</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">个股分析：{stock.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">当前页面演示股票代码输入后的默认深度分析结果，后续可接入搜索框和真实行情财务 API。</p>
        </div>

        <section className="grid gap-4 xl:grid-cols-[260px_1fr]">
          <ScoreBadge score={score.score} rating={score.rating} />
          <Card>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stock.market} · {stock.industry}
                </p>
                <h3 className="mt-1 text-3xl font-bold text-slate-950">
                  {stock.name} <span className="text-xl text-slate-400">{stock.symbol}</span>
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{report.oneLineConclusion}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-right">
                <div>
                  <p className="text-sm text-slate-500">价格</p>
                  <p className="mt-1 text-xl font-bold text-slate-950">{stock.price}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">涨跌幅</p>
                  <p className={stock.changePercent >= 0 ? "mt-1 text-xl font-bold text-profit" : "mt-1 text-xl font-bold text-loss"}>
                    {stock.changePercent}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">市值</p>
                  <p className="mt-1 text-xl font-bold text-slate-950">{stock.marketCap}</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <Card>
            <Building2 className="h-5 w-5 text-brand-600" aria-hidden />
            <p className="mt-3 text-sm text-slate-500">商业模式</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{stock.businessModel}</p>
          </Card>
          <Card>
            <CircleDollarSign className="h-5 w-5 text-emerald-600" aria-hidden />
            <p className="mt-3 text-sm text-slate-500">估值状态</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{stock.valuation.status}</p>
            <p className="mt-2 text-sm text-slate-600">PE {stock.valuation.pe}，5 年分位 {stock.valuation.pePercentile5y}%</p>
          </Card>
          <Card>
            <CandlestickChart className="h-5 w-5 text-blue-600" aria-hidden />
            <p className="mt-3 text-sm text-slate-500">技术趋势</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{stock.technical.trend}</p>
            <p className="mt-2 text-sm text-slate-600">支撑 {stock.technical.support} / 压力 {stock.technical.resistance}</p>
          </Card>
          <Card>
            <Activity className="h-5 w-5 text-purple-600" aria-hidden />
            <p className="mt-3 text-sm text-slate-500">市场定价</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{stock.capital.pricingStatus}</p>
            <p className="mt-2 text-sm text-slate-600">板块联动 {stock.capital.sectorLinkage}，成交量 {stock.capital.volumeSignal}</p>
          </Card>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <Card>
            <InsightList title="投资主线" items={report.logic} />
          </Card>
          <Card>
            <h3 className="mb-4 text-base font-semibold text-slate-950">评分拆解</h3>
            <FactorBars factors={stock.scoreFactors} />
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <InsightList title="催化剂" items={stock.catalysts} tone="track" />
          </Card>
          <Card>
            <InsightList title="风险提示" items={stock.risks} tone="risk" />
          </Card>
          <Card>
            <InsightList title="反证条件" items={stock.invalidation} tone="risk" />
          </Card>
        </section>

        <Card>
          <h3 className="mb-4 text-base font-semibold text-slate-950">横向对比</h3>
          <div className="table-scroll overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-3">公司</th>
                  <th className="pb-3">定位</th>
                  <th className="pb-3">评分</th>
                  <th className="pb-3">评级</th>
                  <th className="pb-3">估值</th>
                  <th className="pb-3">技术</th>
                  <th className="pb-3">主要风险</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {peers.map((peer) => (
                  <tr key={peer.symbol}>
                    <td className="py-3 font-medium text-slate-950">{peer.name}</td>
                    <td className="py-3 text-slate-600">{peer.industry}</td>
                    <td className="py-3 font-semibold text-slate-950">{peer.score}</td>
                    <td className="py-3 text-slate-600">{peer.rating}</td>
                    <td className="py-3 text-slate-600">{peer.valuation.status}</td>
                    <td className="py-3 text-slate-600">{peer.technical.trend}</td>
                    <td className="py-3 text-slate-600">{peer.risks[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
