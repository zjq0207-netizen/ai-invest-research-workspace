import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <Header />
      <div className="mx-auto flex w-full max-w-[1920px] gap-6 px-4 py-6 md:px-8 2xl:px-10">
        <aside className="sticky top-24 hidden h-fit w-56 shrink-0 rounded-lg bg-white p-3 shadow-soft lg:block xl:w-60">
          <Navigation />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white px-2 py-2 md:hidden">
        <Navigation mobile />
      </div>
    </div>
  );
}
