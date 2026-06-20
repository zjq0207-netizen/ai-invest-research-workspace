import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { IndustryChainMap } from "@/components/research/IndustryChainMap";
import { InsightList } from "@/components/research/InsightList";
import { ScoreBadge } from "@/components/research/ScoreBadge";
import { buildIndustryReport, getIndustryChain } from "@/utils/researchEngine";

export default function IndustryPage() {
  const chain = getIndustryChain();
  const report = buildIndustryReport();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">Industry Chain</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">{chain.name}产业链地图</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{chain.conclusion}</p>
        </div>

        <section className="grid gap-4 xl:grid-cols-[240px_1fr]">
          <ScoreBadge score={report.score} rating={report.rating} />
          <Card>
            <InsightList title="产业判断" items={report.logic} />
          </Card>
        </section>

        <IndustryChainMap chain={chain} />

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <InsightList title="主要风险" items={report.risks} tone="risk" />
          </Card>
          <Card>
            <InsightList title="跟踪指标" items={report.tracking} tone="track" />
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
