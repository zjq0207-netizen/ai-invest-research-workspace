import Link from "next/link";
import { ArrowRight, BellRing, FileText, Newspaper, Radar, Search, ShieldAlert, Share2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { FeaturedReport, ReportCard } from "@/components/research/ReportCard";
import { getAllReports, getIndustryChain } from "@/utils/researchEngine";

const captureActions = [
  { href: "/stocks", label: "输入股票代码", icon: Search, description: "生成个股深度、评分和风险反证" },
  { href: "/news", label: "粘贴新闻", icon: Newspaper, description: "拆解影响路径、受益链条和定价程度" },
  { href: "/industry", label: "查看产业链", icon: Share2, description: "判断利润环节、竞争格局和代表公司" },
  { href: "/reports", label: "报告中心", icon: FileText, description: "沉淀报告版本、证据和跟踪点" }
];

export default function DashboardPage() {
  const reports = getAllReports();
  const chain = getIndustryChain();

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm text-slate-500">Research Workspace</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-950">从新闻、行业和股票生成可复盘的投资判断</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              MVP 已内置单股分析、新闻拆解、产业链地图、评分模型、风险反证和报告生成流程。当前使用本地模拟数据，后续可替换为行情、财务、公告和新闻 API。
            </p>
          </div>
          <Card className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">行业景气</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{chain.prosperityScore}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">报告数量</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{reports.length}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">核心场景</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">4</p>
            </div>
          </Card>
        </section>

        <FeaturedReport report={reports[0]} />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {captureActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Card className="h-full border border-slate-100 shadow-none transition hover:border-brand-100 hover:shadow-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-950">{action.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    开始分析
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Card>
              </Link>
            );
          })}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <Radar className="h-5 w-5 text-brand-600" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold text-slate-950">机会雷达</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">AI 基础设施仍处高景气，需重点区分真实订单受益和估值已充分反应的标的。</p>
          </Card>
          <Card>
            <ShieldAlert className="h-5 w-5 text-red-600" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold text-slate-950">风险预警</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">光模块、GPU 等高景气资产估值分位偏高，若订单或毛利率低于预期，回撤风险会放大。</p>
          </Card>
          <Card>
            <BellRing className="h-5 w-5 text-blue-600" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold text-slate-950">跟踪闭环</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">每份报告都沉淀催化剂、反证条件和跟踪指标，方便后续复盘投资逻辑是否兑现。</p>
          </Card>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-950">最近研究报告</h3>
            <Link href="/reports" className="text-sm font-semibold text-brand-600">
              全部报告
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
