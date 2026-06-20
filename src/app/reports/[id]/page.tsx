import { notFound } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { InsightList } from "@/components/research/InsightList";
import { ScoreBadge } from "@/components/research/ScoreBadge";
import { getAllReports } from "@/utils/researchEngine";

export function generateStaticParams() {
  return getAllReports().map((report) => ({
    id: report.id
  }));
}

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const report = getAllReports().find((item) => item.id === params.id);

  if (!report) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="grid gap-4 xl:grid-cols-[240px_1fr]">
          <ScoreBadge score={report.score} rating={report.rating} />
          <Card>
            <p className="text-sm text-slate-500">
              {report.reportType} · {report.generatedAt}
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-950">{report.title}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">{report.oneLineConclusion}</p>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <InsightList title="投资逻辑" items={report.logic} />
          </Card>
          <Card>
            <InsightList title="证据来源" items={report.evidence} tone="track" />
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <InsightList title="主要风险" items={report.risks} tone="risk" />
          </Card>
          <Card>
            <InsightList title="逻辑失效条件" items={report.invalidation} tone="risk" />
          </Card>
          <Card>
            <InsightList title="后续跟踪点" items={report.tracking} tone="track" />
          </Card>
        </section>

        <Card>
          <h3 className="text-base font-semibold text-slate-950">合规提示</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            本报告由本地 MVP 的结构化数据和规则模型生成，仅用于投资研究辅助、信息整理、逻辑分析和风险提示，不构成个性化投资建议。
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
