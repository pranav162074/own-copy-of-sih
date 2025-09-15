import { useState } from "react";

export default function ModelLab() {
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <section className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Model Lab</h1>
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">Upload datasets to run optimization and view explainability (SHAP, rules, reasoning).</p>
        <div className="mt-4 flex items-center gap-3">
          <input id="file" type="file" className="hidden" onChange={(e)=> setFileName(e.target.files?.[0]?.name || null)} />
          <label htmlFor="file" className="rounded-md border px-4 py-2 text-sm hover:bg-muted cursor-pointer">Upload Data</label>
          {fileName && <span className="text-xs text-muted-foreground">Selected: {fileName}</span>}
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Run Model</button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Explainability: SHAP</h3><div className="mt-2 h-40 grid grid-cols-5 gap-2">{Array.from({length:5}).map((_,i)=>(<div key={i} className="rounded-md bg-primary/20" style={{height: `${20+i*10}%`}} />))}</div></div>
        <div className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Decision Rules</h3><ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1"><li>Maintain headway >= safe_threshold</li><li>Precedence to express if total delay reduction > 2m</li><li>Respect maintenance blocks</li></ul></div>
      </div>
    </section>
  );
}