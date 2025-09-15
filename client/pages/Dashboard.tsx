import { KPI } from "@/components/KPI";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const trend = Array.from({ length: 24 }, (_, i) => ({ t: i, delay: Math.max(0, 8 + Math.sin(i/3)*2 + (i>12? -1:1)) }))

export default function Dashboard() {
  return (
    <section className="container py-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="Punctuality" value="92.4%" delta={2.1} color="#34d399" />
        <KPI label="Avg Delay" value="7.8 min" delta={-12.3} color="#60a5fa" />
        <KPI label="Throughput" value="+18 tph" delta={4.6} color="#a78bfa" />
        <KPI label="Utilization" value="73%" delta={1.9} color="#f59e0b" />
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">Average Delay Trend</h3>
          <div className="text-xs text-muted-foreground">Scenario: Baseline vs Optimized</div>
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
