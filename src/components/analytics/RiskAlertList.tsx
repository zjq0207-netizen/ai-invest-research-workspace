import { Badge } from "@/components/ui/Badge";
import type { RiskAlert } from "@/types/portfolio";
import { getRiskBadgeClassName, getRiskLevelLabel } from "@/utils/formatters";

export function RiskAlertList({ alerts }: { alerts: RiskAlert[] }) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="rounded-lg border border-slate-100 bg-white p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getRiskBadgeClassName(alert.level)}>{getRiskLevelLabel(alert.level)}</Badge>
            <h3 className="font-semibold text-slate-950">{alert.title}</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">{alert.content}</p>
          <p className="mt-2 text-xs text-slate-400">触发规则：{alert.triggerRule}</p>
        </div>
      ))}
    </div>
  );
}
