import { clsx } from "clsx";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={clsx("rounded-lg bg-white p-5 shadow-soft", className)}>{children}</section>;
}
