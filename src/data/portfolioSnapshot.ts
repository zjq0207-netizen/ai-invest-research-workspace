import { mockAssets } from "@/data/mockAssets";
import { mockExchangeRates } from "@/data/mockExchangeRates";
import { mockHoldings } from "@/data/mockHoldings";
import { getLatestPrice } from "@/services/priceService";
import type { PriceQuote } from "@/types/portfolio";
import { buildComputedHoldings } from "@/utils/calculations";

export async function getPortfolioSnapshot() {
  const quoteResults = await Promise.all(
    mockHoldings.map(async (holding) => {
      const asset = mockAssets.find((item) => item.id === holding.assetId);
      if (!asset) return { holding, source: "mock fallback" as const };
      const quote = await getLatestPrice(asset, holding);
      return {
        holding: {
          ...holding,
          currentPrice: quote.price,
          previousClose: quote.previousClose ?? holding.previousClose,
          updatedAt: quote.updatedAt
        },
        source: quote.source
      };
    })
  );
  const refreshedHoldings = quoteResults.map((item) => item.holding);
  const priceSource: PriceQuote["source"] = quoteResults.some((item) => item.source === "realtime")
    ? "realtime"
    : "mock fallback";

  return {
    assets: mockAssets,
    holdings: refreshedHoldings,
    exchangeRates: mockExchangeRates,
    computedHoldings: buildComputedHoldings(mockAssets, refreshedHoldings, mockExchangeRates),
    priceSource
  };
}
