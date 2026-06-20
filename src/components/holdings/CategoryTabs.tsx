"use client";

import type { AssetCategory } from "@/types/portfolio";

export type HoldingCategoryFilter = AssetCategory | "ALL";

export function CategoryTabs({
  value,
  onChange
}: {
  value: HoldingCategoryFilter;
  onChange: (value: HoldingCategoryFilter) => void;
}) {
  const options = [
    { label: "全部", value: "ALL" },
    { label: "美股", value: "US_STOCK" },
    { label: "港股", value: "HK_STOCK" },
    { label: "A股", value: "CN_STOCK" },
    { label: "积存金", value: "GOLD" },
    { label: "其他", value: "OTHER" }
  ] as const;

  return (
    <div className="flex gap-2 overflow-x-auto rounded-lg bg-slate-100 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={
            value === option.value
              ? "shrink-0 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-950 shadow-sm transition"
              : "shrink-0 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          }
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
