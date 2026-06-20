export function EmptyState({ title = "暂无数据" }: { title?: string }) {
  return <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">{title}</div>;
}
