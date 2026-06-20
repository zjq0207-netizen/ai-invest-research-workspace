import { clsx } from "clsx";
import type { Rating } from "@/types/research";

const toneByRating: Record<Rating, string> = {
  强关注: "border-emerald-200 bg-emerald-50 text-emerald-700",
  关注: "border-blue-200 bg-blue-50 text-blue-700",
  中性: "border-slate-200 bg-slate-50 text-slate-700",
  谨慎: "border-amber-200 bg-amber-50 text-amber-700",
  回避: "border-red-200 bg-red-50 text-red-700"
};

export function ScoreBadge({ score, rating }: { score: number; rating: Rating }) {
  return (
    <div className={clsx("rounded-lg border p-4", toneByRating[rating])}>
      <p className="text-sm font-medium">综合评分</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-4xl font-bold leading-none">{score}</span>
        <span className="pb-1 text-sm">/ 100</span>
      </div>
      <p className="mt-3 text-lg font-semibold">{rating}</p>
    </div>
  );
}
