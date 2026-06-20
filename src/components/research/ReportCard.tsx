import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ScoreBadge } from "@/components/research/ScoreBadge";
import type { ResearchReport } from "@/types/research";

export function ReportCard({ report }: { report: ResearchReport }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{report.reportType}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950">{report.title}</h3>
        </div>
        <div className="shrink-0 rounded-lg bg-slate-50 px-3 py-2 text-center">
          <p className="text-xl font-bold text-slate-950">{report.score}</p>
          <p className="text-xs text-slate-500">{report.rating}</p>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600">{report.oneLineConclusion}</p>
      <Link href={`/reports/${report.id}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
        查看报告
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  );
}

export function FeaturedReport({ report }: { report: ResearchReport }) {
  return (
    <Card className="grid gap-5 lg:grid-cols-[220px_1fr]">
      <ScoreBadge score={report.score} rating={report.rating} />
      <div>
        <p className="text-sm text-slate-500">{report.reportType}</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950">{report.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{report.oneLineConclusion}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {report.tracking.slice(0, 4).map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
