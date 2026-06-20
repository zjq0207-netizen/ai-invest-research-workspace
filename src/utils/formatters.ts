import type { Currency, RiskLevel } from "@/types/portfolio";
import { clsx } from "clsx";

const currencySymbols: Record<Currency, string> = {
  CNY: "¥",
  USD: "$",
  HKD: "HK$"
};

export function formatCurrency(amount: number, currency: Currency = "CNY") {
  return `${currencySymbols[currency]}${amount.toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function formatPercent(value: number) {
  return `${(value * 100).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}%`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
}

export function formatDateTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function getProfitClassName(value: number) {
  return clsx(value > 0 && "text-profit", value < 0 && "text-loss", value === 0 && "text-slate-500");
}

export function getRiskLevelLabel(level: RiskLevel) {
  const labels: Record<RiskLevel, string> = {
    high: "高风险",
    medium: "中风险",
    low: "低风险"
  };
  return labels[level];
}

export function getRiskBadgeClassName(level: RiskLevel) {
  return {
    high: "border-red-200 bg-red-50 text-red-700",
    medium: "border-amber-200 bg-amber-50 text-amber-700",
    low: "border-emerald-200 bg-emerald-50 text-emerald-700"
  }[level];
}
