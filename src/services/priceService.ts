import type { Asset, Holding, PriceQuote } from "@/types/portfolio";

const REALTIME_ENABLED = process.env.NEXT_PUBLIC_ENABLE_REALTIME_PRICES === "true";

function fallbackQuote(holding: Holding): PriceQuote {
  return {
    price: holding.currentPrice,
    previousClose: holding.previousClose,
    source: "mock fallback",
    updatedAt: holding.updatedAt
  };
}

async function fetchWithTimeout(url: string, timeoutMs = 2500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal, next: { revalidate: 300 } });
  } finally {
    clearTimeout(timer);
  }
}

async function getStooqPrice(symbol: string): Promise<Pick<PriceQuote, "price" | "previousClose"> | null> {
  const response = await fetchWithTimeout(`https://stooq.com/q/l/?s=${encodeURIComponent(symbol.toLowerCase())}&f=sd2t2ohlcv&h&e=csv`);
  if (!response.ok) return null;
  const text = await response.text();
  const rows = text.trim().split("\n");
  const values = rows[1]?.split(",");
  const close = Number(values?.[6]);
  const open = Number(values?.[3]);
  if (!Number.isFinite(close)) return null;
  return { price: close, previousClose: Number.isFinite(open) ? open : close };
}

function toStooqSymbol(asset: Asset) {
  if (asset.category === "US_STOCK") return `${asset.ticker}.us`;
  if (asset.category === "HK_STOCK") return asset.ticker.replace(".HK", ".hk");
  return "";
}

export async function getLatestPrice(asset: Asset, holding: Holding): Promise<PriceQuote> {
  if (!REALTIME_ENABLED) return fallbackQuote(holding);

  try {
    const stooqSymbol = toStooqSymbol(asset);
    if (stooqSymbol) {
      const quote = await getStooqPrice(stooqSymbol);
      if (quote) {
        return {
          price: quote.price,
          previousClose: quote.previousClose,
          source: "realtime",
          updatedAt: new Date().toISOString()
        };
      }
    }

    return fallbackQuote(holding);
  } catch {
    return fallbackQuote(holding);
  }
}
