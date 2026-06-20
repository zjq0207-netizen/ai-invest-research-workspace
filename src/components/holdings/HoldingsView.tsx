"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryTabs, type HoldingCategoryFilter } from "@/components/holdings/CategoryTabs";
import { FilteredSummaryCards } from "@/components/holdings/FilteredSummaryCards";
import { GoldTransactionsTable } from "@/components/holdings/GoldTransactionsTable";
import { HoldingsTable } from "@/components/holdings/HoldingsTable";
import { mockGoldTransactions } from "@/data/mockGoldTransactions";
import { calculateFilteredSummary } from "@/utils/calculations";
import type { ComputedHolding } from "@/types/portfolio";

export function HoldingsView({
  holdings,
  priceSource,
  initialCategory = "ALL"
}: {
  holdings: ComputedHolding[];
  priceSource: "realtime" | "mock fallback";
  initialCategory?: HoldingCategoryFilter;
}) {
  const [category, setCategory] = useState<HoldingCategoryFilter>(initialCategory);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);
  const filtered = useMemo(
    () => (category === "ALL" ? holdings : holdings.filter((item) => item.asset.category === category)),
    [category, holdings]
  );
  const summary = useMemo(() => calculateFilteredSummary(holdings, category), [category, holdings]);
  const updatedAt = filtered.map((item) => item.holdingId).length ? new Date().toISOString() : new Date().toISOString();

  return (
    <div className="space-y-5">
      <CategoryTabs value={category} onChange={setCategory} />
      <FilteredSummaryCards summary={summary} />
      <HoldingsTable holdings={filtered} showCny={category === "ALL"} updatedAt={updatedAt} priceSource={priceSource} />
      {category === "GOLD" && <GoldTransactionsTable transactions={mockGoldTransactions} />}
    </div>
  );
}
