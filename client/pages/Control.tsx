import TrackTimeline, { Train } from "@/components/TrackTimeline";
import { useMemo, useState } from "react";

export default function Control() {
  const [preview, setPreview] = useState(false);
  const [trains, setTrains] = useState<Train[]>([
    { id: "12951", start: 10, baselineStart: 10, length: 18, lane: 0, label: "EXP 12951", category: "express" },
    { id: "G-203", start: 20, baselineStart: 20, length: 14, lane: 1, label: "FR G-203", category: "freight" },
    { id: "S-12", start: 8, baselineStart: 8, length: 10, lane: 2, label: "SUB S-12", category: "suburban" },
    { id: "M-BLK", start: 28, baselineStart: 28, length: 12, lane: 3, label: "MAINT", category: "maintenance" },
  ]);
  const [selectedId, setSelectedId] = useState<string>(trains[0].id);
  const selected = trains.find((t) => t.id === selectedId)!;

  const kpis = useMemo(() => {
    const avgDelay =
      trains.reduce((acc, t) => acc + Math.max(0, (t.start - (t.baselineStart ?? t.start))), 0) / trains.length;
    const throughput = 12 + Math.round((100 - avgDelay) / 20); // simple synthetic function
    const utilization = 60 + Math.round(trains.length * 3);
    return { avgDelay: avgDelay.toFixed(1), throughput, utilization };
  }, [trains]);

  return (
    <section className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Section Control</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreview((v) => !v)} className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
            {preview ? "Exit" : "Scenario"} Mode
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Auto-optimize</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <TrackTimeline trains={trains} setTrains={setTrains} lanes={4} />
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">What‑If Controls</h3>
          <div className="mt-3 grid gap-3 text-sm">
            <label className="grid gap-1">
              <span>Train</span>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="rounded-md border bg-background px-3 py-2"
              >
                {trains.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span>Delay (+ units)</span>
              <input
                type="range"
                min={0}
                max={20}
                value={(selected.start - (selected.baselineStart ?? selected.start))}
                onChange={(e) => {
                  const delay = parseInt(e.target.value);
                  setTrains((ts) => ts.map((t) => (t.id === selectedId ? { ...t, start: (t.baselineStart ?? t.start) + delay } : t)));
                }}
              />
            </label>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Avg Delay</div>
                <div className="text-lg font-semibold">{kpis.avgDelay} u</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Throughput</div>
                <div className="text-lg font-semibold">{kpis.throughput} tph</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Utilization</div>
                <div className="text-lg font-semibold">{kpis.utilization}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {preview && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold">Baseline</h3>
            <p className="text-sm text-muted-foreground mt-1">Avg delay: 9.2m · Throughput: 16 tph</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold">Human</h3>
            <p className="text-sm text-muted-foreground mt-1">Avg delay: 8.9m · Throughput: 17 tph</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold">AI Optimized</h3>
            <p className="text-sm text-muted-foreground mt-1">Avg delay: 7.6m · Throughput: 18 tph</p>
          </div>
        </div>
      )}
    </section>
  );
}
