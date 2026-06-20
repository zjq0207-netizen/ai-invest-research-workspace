import { categoryLabels } from "@/data/mockAssets";
import type {
  Asset,
  AssetCategory,
  ComputedHolding,
  Currency,
  DistributionItem,
  ExchangeRate,
  Holding,
  PortfolioSummary,
  SortDirection,
  SortField
} from "@/types/portfolio";

export const categoryOrder: AssetCategory[] = ["US_STOCK", "HK_STOCK", "CN_STOCK", "GOLD", "OTHER"];

export function convertToCny(amount: number, currency: Currency, exchangeRates: ExchangeRate[]) {
  if (currency === "CNY") return amount;
  const rate = exchangeRates.find((item) => item.from === currency && item.to === "CNY")?.rate ?? 1;
  return amount * rate;
}

export function calculateHoldingValues(
  holding: Holding,
  asset: Asset,
  exchangeRates: ExchangeRate[]
): ComputedHolding {
  const marketValue = holding.quantity * holding.currentPrice;
  const costValue = holding.quantity * holding.avgCost;
  const totalProfitLoss = marketValue - costValue;
  const todayProfitLoss = holding.quantity * (holding.currentPrice - holding.previousClose);

  return {
    holdingId: holding.id,
    asset,
    quantity: holding.quantity,
    avgCost: holding.avgCost,
    currentPrice: holding.currentPrice,
    previousClose: holding.previousClose,
    todayProfitLoss,
    todayProfitRate: holding.previousClose === 0 ? 0 : (holding.currentPrice - holding.previousClose) / holding.previousClose,
    costValue,
    marketValue,
    totalProfitLoss,
    totalProfitRate: costValue === 0 ? 0 : totalProfitLoss / costValue,
    marketValueCny: convertToCny(marketValue, holding.currency, exchangeRates),
    costValueCny: convertToCny(costValue, holding.currency, exchangeRates),
    totalProfitLossCny: convertToCny(totalProfitLoss, holding.currency, exchangeRates),
    positionRatio: 0
  };
}

export function attachPositionRatios(holdings: ComputedHolding[]) {
  const total = holdings.reduce((sum, item) => sum + item.marketValueCny, 0);
  return holdings.map((item) => ({
    ...item,
    positionRatio: total === 0 ? 0 : item.marketValueCny / total
  }));
}

export function calculatePortfolioSummary(computedHoldings: ComputedHolding[]): PortfolioSummary {
  const totalMarketValueCny = computedHoldings.reduce((sum, item) => sum + item.marketValueCny, 0);
  const totalCostValueCny = computedHoldings.reduce((sum, item) => sum + item.costValueCny, 0);
  const totalProfitLossCny = totalMarketValueCny - totalCostValueCny;
  return {
    totalMarketValueCny,
    totalCostValueCny,
    totalProfitLossCny,
    totalProfitRate: totalCostValueCny === 0 ? 0 : totalProfitLossCny / totalCostValueCny
  };
}

function calculateDistribution(
  computedHoldings: ComputedHolding[],
  keyGetter: (item: ComputedHolding) => string,
  nameGetter: (key: string) => string = (key) => key
): DistributionItem[] {
  const total = computedHoldings.reduce((sum, item) => sum + item.marketValueCny, 0);
  const map = new Map<string, DistributionItem>();

  computedHoldings.forEach((item) => {
    const key = keyGetter(item);
    const current = map.get(key) ?? {
      key,
      name: nameGetter(key),
      marketValueCny: 0,
      costValueCny: 0,
      profitLossCny: 0,
      ratio: 0
    };
    current.marketValueCny += item.marketValueCny;
    current.costValueCny += item.costValueCny;
    current.profitLossCny += item.totalProfitLossCny;
    map.set(key, current);
  });

  return Array.from(map.values())
    .map((item) => ({ ...item, ratio: total === 0 ? 0 : item.marketValueCny / total }))
    .sort((a, b) => b.marketValueCny - a.marketValueCny);
}

export function calculateCategoryDistribution(computedHoldings: ComputedHolding[]) {
  const items = calculateDistribution(
    computedHoldings,
    (item) => item.asset.category,
    (key) => categoryLabels[key as AssetCategory]
  );
  return categoryOrder
    .map((category) => items.find((item) => item.key === category))
    .filter((item): item is DistributionItem => Boolean(item));
}

export function calculateMarketDistribution(computedHoldings: ComputedHolding[]) {
  return calculateDistribution(computedHoldings, (item) => item.asset.market);
}

export function calculateIndustryDistribution(computedHoldings: ComputedHolding[]) {
  return calculateDistribution(computedHoldings, (item) => item.asset.industry);
}

export function calculateProfitContribution(computedHoldings: ComputedHolding[]) {
  const totalProfit = computedHoldings.reduce((sum, item) => sum + item.totalProfitLossCny, 0);
  return computedHoldings
    .map((item) => ({
      ...item,
      contributionRatio: totalProfit === 0 ? 0 : item.totalProfitLossCny / totalProfit
    }))
    .sort((a, b) => Math.abs(b.contributionRatio) - Math.abs(a.contributionRatio));
}

export function calculateFilteredSummary(computedHoldings: ComputedHolding[], selectedCategory: AssetCategory | "ALL") {
  const filtered =
    selectedCategory === "ALL" ? computedHoldings : computedHoldings.filter((item) => item.asset.category === selectedCategory);
  const currencies = new Set(filtered.map((item) => item.asset.currency));
  const useCny = selectedCategory === "ALL" || currencies.size > 1;

  const totalMarketValue = filtered.reduce((sum, item) => sum + (useCny ? item.marketValueCny : item.marketValue), 0);
  const totalCostValue = filtered.reduce((sum, item) => sum + (useCny ? item.costValueCny : item.costValue), 0);
  const totalProfitLoss = totalMarketValue - totalCostValue;
  const currency = useCny ? "CNY" : filtered[0]?.asset.currency ?? "CNY";

  return {
    totalMarketValue,
    totalCostValue,
    totalProfitLoss,
    totalProfitRate: totalCostValue === 0 ? 0 : totalProfitLoss / totalCostValue,
    currency
  };
}

export function sortHoldings(holdings: ComputedHolding[], sortField: SortField, sortDirection: SortDirection) {
  const factor = sortDirection === "asc" ? 1 : -1;
  return [...holdings].sort((a, b) => {
    const valueA = sortField === "marketValue" ? a.marketValue : sortField === "totalProfitLoss" ? a.totalProfitLoss : a[sortField];
    const valueB = sortField === "marketValue" ? b.marketValue : sortField === "totalProfitLoss" ? b.totalProfitLoss : b[sortField];
    return (valueA - valueB) * factor;
  });
}

export function buildComputedHoldings(assets: Asset[], holdings: Holding[], exchangeRates: ExchangeRate[]) {
  const computed = holdings
    .map((holding) => {
      const asset = assets.find((item) => item.id === holding.assetId);
      return asset ? calculateHoldingValues(holding, asset, exchangeRates) : null;
    })
    .filter((item): item is ComputedHolding => Boolean(item));
  return attachPositionRatios(computed);
}
