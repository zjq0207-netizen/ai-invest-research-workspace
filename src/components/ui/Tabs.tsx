import { clsx } from "clsx";

export interface TabOption<T extends string> {
  label: string;
  value: T;
}

export function Tabs<T extends string>({
  options,
  value,
  onChange
}: {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-lg bg-slate-100 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          className={clsx(
            "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition",
            value === option.value ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"
          )}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
