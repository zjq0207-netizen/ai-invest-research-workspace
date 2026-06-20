import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 投资研究工作台",
  description: "投资研究辅助、新闻拆解、产业链分析和风险反证"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
