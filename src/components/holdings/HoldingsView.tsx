"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryTabs, type HoldingCategoryFilter } from "@/components/holdings/CategoryTabs";
import { FilteredSummaryCards } from "@/components/holdings/FilteredSummaryCards";
import { GoldTransactionsTable } from "@/components/holdings/GoldTransactionsTable";
import { HoldingsTable } from "@/components/holdings/HoldingsTable";
import { mockGoldTransactions } from "@/data/mockGoldTransactions";
import { calculateFilteredSummary } from "@/utils/calculations";
import type { ComputedHolding } from "@/types/portfolio";

const validCategories: HoldingCategoryFilter[] = ["ALL", "US_STOCK", "HK_STOCK", "CN_STOCK", "GOLD", "OTHER"];

export function HoldingsView({
  holdings,
  priceSource
}: {
  holdings: ComputedHolding[];
  priceSource: "realtime" | "mock fallback";
}) {
  const [category, setCategory] = useState<HoldingCategoryFilter>("ALL");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category") ?? "ALL";

    if (validCategories.includes(requestedCategory as HoldingCategoryFilter)) {
      setCategory(requestedCategory as HoldingCategoryFilter);
    }
  }, []);

  const handleCategoryChange = (value: HoldingCategoryFilter) => {
    setCategory(value);

    const nextUrl = value === "ALL" ? window.location.pathname : `${window.location.pathname}?category=${value}`;
    window.history.pushState(null, "", nextUrl);
  };

  const filtered = useMemo(
    () => (category === "ALL" ? holdings : holdings.filter((item) => item.asset.category === category)),
    [category, holdings]
  );
  const summary = useMemo(() => calculateFilteredSummary(holdings, category), [category, holdings]);
  const updatedAt = filtered.map((item) => item.holdingId).length ? new Date().toISOString() : new Date().toISOString();

  return (
    <div className="space-y-5">
      <CategoryTabs value={category} onChange={handleCategoryChange} />
      <FilteredSummaryCards summary={summary} />
      <HoldingsTable holdings={filtered} showCny={category === "ALL"} updatedAt={updatedAt} priceSource={priceSource} />
      {category === "GOLD" && <GoldTransactionsTable transactions={mockGoldTransactions} />}
    </div>
  );
}
