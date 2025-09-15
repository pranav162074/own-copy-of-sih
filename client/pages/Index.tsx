import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Index() {
  const [congestion, setCongestion] = useState(55);

  const data = useMemo(() => {
    // Create a synthetic performance curve based on congestion level
    const points = Array.from({ length: 11 }, (_, i) => i * 10);
    return points.map((x) => {
      const utilization = x;
      // Throughput curve: rises then falls as congestion increases (reflecting network effects)
      const base = utilization * Math.exp(-utilization / (60 + congestion / 2));
      const normalized = Math.round((base / 60) * 100);
      // Average delay decreases with better control (higher congestion needs smarter control)
      const delay = Math.max(1, Math.round(120 - normalized));
      return { utilization, throughput: Math.max(0, normalized), delay };
    });
  }, [congestion]);

  return (
    <div className="bg-gradient-to-b from-background to-muted/40">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-x-0 -top-24 -z-10 blur-3xl opacity-30">
          <div className="mx-auto h-64 w-11/12 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <div className="container grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" /> Real-time decision support
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Orchestrate India’s Rail Network with AI Precision
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-prose">
              RailFlow AI assists section controllers to maximize throughput and minimize travel time across mixed-priority trains—safely and efficiently.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">
                Request a Demo
              </Link>
              <Link to="/features" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">
                Explore Features
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground max-w-md">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"/> Adaptive scheduling</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"/> Conflict resolution</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"/> Throughput maximization</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"/> Safety-first recommendations</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Throughput vs. Network Utilization</h3>
              <span className="text-xs text-muted-foreground">Interactive model</span>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                  <XAxis dataKey="utilization" tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="throughput" stroke="hsl(var(--primary))" strokeWidth={2.2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <label className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Congestion sensitivity</span>
                <span className="font-medium text-foreground">{congestion}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={90}
                value={congestion}
                onChange={(e) => setCongestion(parseInt(e.target.value))}
                className="mt-2 w-full accent-[hsl(var(--accent))]"
                aria-label="Congestion sensitivity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Built for controllers, optimized for the network</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">A human-in-the-loop AI that learns operational patterns, balances priorities, and recommends safe, high-throughput movements.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Real-time conflict detection", desc: "Detects route, block, and platform conflicts using rule-based and ML heuristics.", icon: "M5 32h54M9 24h46M13 16h38" },
            { title: "Adaptive rescheduling", desc: "Recalculates optimal crossing and precedence under disruptions.", icon: "M8 40h30a8 8 0 0 0 8-8V8" },
            { title: "Priority-aware routing", desc: "Honors passenger and freight priorities while minimizing total delay.", icon: "M8 48h24M8 32h40M8 16h32" },
            { title: "What-if simulation", desc: "Test scenarios across utilization and rolling stock constraints.", icon: "M8 48l16-16 16 16" },
            { title: "Seamless integrations", desc: "Connects with control office apps and signalling feeds via secure APIs.", icon: "M10 22l10 10 22-22" },
            { title: "Explainable AI", desc: "Transparent rationale for every recommendation to build controller trust.", icon: "M12 52c10-10 30-30 40-40" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <svg viewBox="0 0 64 64" width="22" height="22" className="text-primary" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d={f.icon}/></svg>
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container py-16">
          <div className="md:flex md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Use cases</h2>
              <p className="mt-2 text-muted-foreground max-w-xl">From suburban corridors to high-density trunk routes, optimize traffic safely.</p>
            </div>
            <Link to="/use-cases" className="mt-4 md:mt-0 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">See all</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: "Congested suburban section", desc: "Increase trains per hour while keeping headways safe." },
              { title: "Mixed freight-passenger corridor", desc: "Balance priority trains and minimize knock-on delays." },
              { title: "Maintenance windows", desc: "Replan paths around blocks without crippling throughput." },
            ].map((u) => (
              <div key={u.title} className="rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="container py-16">
        <div className="rounded-2xl border bg-card p-6 md:p-10 shadow-sm">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight">Secure integrations with existing railway systems</h2>
              <p className="mt-2 text-muted-foreground">API-based connectors for control office applications, TMS/CTC, signalling data, and asset systems with strict role-based access control.</p>
            </div>
            <Link to="/features" className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">View integrations</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-12 text-center">
          <h3 className="text-2xl font-bold">Ready to modernize traffic control?</h3>
          <p className="mt-2 text-primary-foreground/80">Start with a pilot on your most congested section and measure impact in weeks.</p>
          <div className="mt-4 flex justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-5 py-3 text-sm font-semibold hover:opacity-90">Talk to us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
