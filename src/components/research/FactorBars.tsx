import type { ScoreFactors } from "@/types/research";

const labels: Array<[keyof ScoreFactors, string]> = [
  ["industry", "行业景气"],
  ["chainPosition", "产业链位置"],
  ["company", "公司竞争力"],
  ["financial", "财务质量"],
  ["growth", "成长确定性"],
  ["valuation", "估值性价比"],
  ["technical", "技术趋势"],
  ["capital", "资金关注度"],
  ["riskPenalty", "风险惩罚"]
];

export function FactorBars({ factors }: { factors: ScoreFactors }) {
  return (
    <div className="space-y-3">
      {labels.map(([key, label]) => {
        const value = factors[key];
        const isRisk = key === "riskPenalty";
        return (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-600">{label}</span>
              <span className={isRisk ? "font-medium text-red-600" : "font-medium text-slate-950"}>{value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={isRisk ? "h-full rounded-full bg-red-400" : "h-full rounded-full bg-brand-500"}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
