import { clsx } from "clsx";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return <table className={clsx("min-w-full divide-y divide-slate-100 text-left text-sm", className)}>{children}</table>;
}

export function Th({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <th
      className={clsx("whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 2xl:px-4", onClick && "cursor-pointer select-none hover:text-slate-900", className)}
      onClick={onClick}
    >
      {children}
    </th>
  );
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={clsx("whitespace-nowrap px-3 py-3 align-top text-slate-700 2xl:px-4", className)}>{children}</td>;
}
