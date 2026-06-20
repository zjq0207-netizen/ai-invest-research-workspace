import { Card } from "@/components/ui/Card";
import type { IndustryChain } from "@/types/research";

export function IndustryChainMap({ chain }: { chain: IndustryChain }) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {chain.nodes.map((node) => (
        <Card key={node.name} className="flex min-h-[260px] flex-col border border-slate-100 shadow-none">
          <div>
            <p className="text-xs font-medium text-brand-600">{node.level}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-950">{node.name}</h3>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">景气度</dt>
              <dd className="font-semibold text-slate-950">{node.prosperity}</dd>
            </div>
            <div>
              <dt className="text-slate-500">利润弹性</dt>
              <dd className="font-semibold text-slate-950">{node.profitElasticity}</dd>
            </div>
            <div>
              <dt className="text-slate-500">竞争格局</dt>
              <dd className="font-semibold text-slate-950">{node.competition}</dd>
            </div>
            <div>
              <dt className="text-slate-500">估值</dt>
              <dd className="font-semibold text-slate-950">{node.valuationState}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <p className="text-xs text-slate-500">代表公司</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">{node.representativeCompanies.join("、")}</p>
          </div>
          <p className="mt-auto pt-4 text-xs leading-5 text-red-600">{node.risks[0]}</p>
        </Card>
      ))}
    </div>
  );
}
