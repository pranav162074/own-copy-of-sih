import { KPI } from "@/components/KPI";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo, useState } from "react";

export default function Dashboard() {
  const [optimized, setOptimized] = useState(false);
  const trend = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({ t: i, delay: Math.max(0, (optimized ? 6.5 : 8) + Math.sin(i / 3) * 2 + (i > 12 ? -1 : 1)) })),
    [optimized]
  );

  return (
    <section className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <button onClick={() => setOptimized((v) => !v)} className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
          {optimized ? "Show Baseline" : "Apply AI"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="Punctuality" value={optimized ? "94.5%" : "92.4%"} delta={optimized ? 2.1 : 0} color="#34d399" />
        <KPI label="Avg Delay" value={optimized ? "6.5 min" : "7.8 min"} delta={optimized ? -16.7 : 0} color="#60a5fa" />
        <KPI label="Throughput" value={optimized ? "+19 tph" : "+18 tph"} delta={optimized ? 5.6 : 0} color="#a78bfa" />
        <KPI label="Utilization" value={optimized ? "74%" : "73%"} delta={optimized ? 1.4 : 0} color="#f59e0b" />
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">Average Delay Trend</h3>
          <div className="text-xs text-muted-foreground">Scenario: {optimized ? "AI Optimized" : "Baseline"}</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
              <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="m" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
              <Area type="monotone" dataKey="delay" stroke="#60a5fa" fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
