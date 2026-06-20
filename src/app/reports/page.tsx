import { AppLayout } from "@/components/layout/AppLayout";
import { ReportCard } from "@/components/research/ReportCard";
import { getAllReports } from "@/utils/researchEngine";

export default function ReportsPage() {
  const reports = getAllReports();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">Research Reports</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">报告中心</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">报告中心保存每次分析的结构化结论、证据、风险、反证和跟踪点。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
