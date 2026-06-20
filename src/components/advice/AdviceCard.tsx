import { Badge } from "@/components/ui/Badge";
import type { Advice } from "@/types/portfolio";
import { formatDateTime, getRiskBadgeClassName, getRiskLevelLabel } from "@/utils/formatters";

export function AdviceCard({ advice }: { advice: Advice }) {
  return (
    <article className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={getRiskBadgeClassName(advice.level)}>{getRiskLevelLabel(advice.level)}</Badge>
        <h3 className="font-semibold text-slate-950">{advice.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{advice.content}</p>
      <p className="mt-3 text-xs text-slate-400">
        {advice.triggerRule} · {formatDateTime(advice.createdAt)}
      </p>
    </article>
  );
}
