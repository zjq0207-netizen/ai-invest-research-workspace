import { CheckCircle2, CircleAlert, ListChecks } from "lucide-react";

const iconByTone = {
  logic: CheckCircle2,
  risk: CircleAlert,
  track: ListChecks
};

export function InsightList({
  title,
  items,
  tone = "logic"
}: {
  title: string;
  items: string[];
  tone?: keyof typeof iconByTone;
}) {
  const Icon = iconByTone[tone];
  const toneClass = tone === "risk" ? "text-red-600" : tone === "track" ? "text-blue-600" : "text-emerald-600";

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${toneClass}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
