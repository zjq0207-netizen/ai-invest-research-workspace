import type { ExchangeRate } from "@/types/portfolio";

export const mockExchangeRates: ExchangeRate[] = [
  { from: "USD", to: "CNY", rate: 7.24, updatedAt: "2026-05-29T09:00:00+08:00" },
  { from: "HKD", to: "CNY", rate: 0.93, updatedAt: "2026-05-29T09:00:00+08:00" },
  { from: "CNY", to: "CNY", rate: 1, updatedAt: "2026-05-29T09:00:00+08:00" }
];
