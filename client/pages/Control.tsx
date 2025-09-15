import TrackTimeline from "@/components/TrackTimeline";
import { useState } from "react";

export default function Control() {
  const [preview, setPreview] = useState(false);
  return (
    <section className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Section Control</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreview((v)=>!v)} className="rounded-md border px-3 py-2 text-sm hover:bg-muted">{preview?"Exit":"Scenario"} Mode</button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Auto-optimize</button>
        </div>
      </div>
      <TrackTimeline />
      {preview && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Baseline</h3><p className="text-sm text-muted-foreground mt-1">Avg delay: 9.2m · Throughput: 16 tph</p></div>
          <div className="rounded-xl border bg-card p-4"><h3 className="font-semibold">Optimized</h3><p className="text-sm text-muted-foreground mt-1">Avg delay: 7.6m · Throughput: 18 tph</p></div>
        </div>
      )}
    </section>
  );
}
