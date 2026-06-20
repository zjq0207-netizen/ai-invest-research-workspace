import { ArrowDown, Newspaper } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { InsightList } from "@/components/research/InsightList";
import { ScoreBadge } from "@/components/research/ScoreBadge";
import { buildNewsReport, getDefaultNewsEvent } from "@/utils/researchEngine";

export default function NewsPage() {
  const event = getDefaultNewsEvent();
  const report = buildNewsReport(event);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">News Event Analysis</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">新闻一键拆解</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">MVP 使用样例新闻展示事件分类、影响路径、受益链条和市场定价程度。</p>
        </div>

        <section className="grid gap-4 xl:grid-cols-[1fr_240px]">
          <Card>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Newspaper className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm text-slate-500">样例输入</p>
                <h3 className="mt-1 text-xl font-bold text-slate-950">{event.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{event.body}</p>
              </div>
            </div>
          </Card>
          <ScoreBadge score={report.score} rating={report.rating} />
        </section>

        <Card>
          <h3 className="text-base font-semibold text-slate-950">事件影响路径</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {event.path.map((step, index) => (
              <div key={step} className="flex items-center gap-3 md:block">
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-medium leading-6 text-slate-700">{step}</div>
                {index < event.path.length - 1 ? <ArrowDown className="h-4 w-4 shrink-0 text-slate-300 md:mx-auto md:mt-3" aria-hidden /> : null}
              </div>
            ))}
          </div>
        </Card>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">事件类型</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{event.eventType}</p>
            <p className="mt-2 text-sm text-slate-600">影响方向：{event.impactDirection}</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">影响强度</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{event.impactStrength}</p>
            <p className="mt-2 text-sm text-slate-600">持续跟踪订单和财报验证。</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">市场定价程度</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{event.pricingStatus}</p>
            <p className="mt-2 text-sm text-slate-600">好消息不等于还有足够上涨空间。</p>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <InsightList title="直接受益" items={event.directBeneficiaries} />
          </Card>
          <Card>
            <InsightList title="间接受益" items={event.indirectBeneficiaries} tone="track" />
          </Card>
          <Card>
            <InsightList title="假受益风险" items={event.fakeBeneficiaries} tone="risk" />
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <InsightList title="风险提示" items={event.risks} tone="risk" />
          </Card>
          <Card>
            <InsightList title="反证条件" items={event.invalidation} tone="risk" />
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
