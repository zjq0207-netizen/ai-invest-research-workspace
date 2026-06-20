import type { Advice } from "@/types/portfolio";

export function ActionItemList({ items }: { items: Advice[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item.id} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-600">
            {index + 1}
          </span>
          <span className="text-sm leading-6 text-slate-700">{item.content}</span>
        </li>
      ))}
    </ol>
  );
}
