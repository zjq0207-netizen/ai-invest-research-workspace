"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Home, Newspaper, Search, Share2 } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "投研首页", icon: Home },
  { href: "/stocks", label: "个股分析", icon: Search },
  { href: "/news", label: "新闻拆解", icon: Newspaper },
  { href: "/industry", label: "产业链", icon: Share2 },
  { href: "/reports", label: "报告中心", icon: FileText },
  { href: "/analytics", label: "组合分析", icon: BarChart3 }
];

export function Navigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  return (
    <nav className={clsx(mobile ? "grid grid-cols-3 gap-1" : "space-y-2")}>
      {navItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition",
              mobile && "flex-col gap-1 px-1 py-2 text-xs",
              active ? "bg-brand-100 text-brand-600" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
