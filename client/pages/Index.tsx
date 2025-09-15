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
    const points = Array.from({ length: 11 }, (_, i) => i * 10);
    return points.map((x) => {
      const utilization = x;
      const base = utilization * Math.exp(-utilization / (60 + congestion / 2));
      const normalized = Math.round((base / 60) * 100);
      const delay = Math.max(1, Math.round(120 - normalized));
      return { utilization, throughput: Math.max(0, normalized), delay };
    });
  }, [congestion]);

  return (
    <div className="bg-gradient-to-b from-background to-muted/40">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-80 w-[1400px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, hsl(var(--primary)/0.25), transparent)" }} />
        </div>
        <div className="container grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" /> AI for Section Control
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Orchestrate India’s Rail Network with AI Precision
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-prose">
              Maximize throughput and minimize delays across mixed-priority trains—safely and explainably.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/dashboard" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">
                Live Demo
              </Link>
              <Link to="/model-lab" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">
                Upload Data
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground max-w-md">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa]"/> Express</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]"/> Freight</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#34d399]"/> Suburban</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]"/> Special</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5 shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
            <SchematicAnimation />
          </div>
        </div>
      </section>

      {/* Interactive model */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Throughput vs Utilization</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">Interactive curve demonstrates diminishing returns under congestion and the benefit of smarter control.</p>
        <div className="mt-6 rounded-xl border bg-card p-5">
          <div className="mt-2 h-56">
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
            <div key={f.title} className="rounded-xl border bg-card p-5 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
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

function SchematicAnimation() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Section schematic</h3>
        <span className="text-xs text-muted-foreground">Animated</span>
      </div>
      <div className="mt-3">
        <svg viewBox="0 0 600 220" width="100%" height="200" className="[&_.train]:animate-[move_6s_linear_infinite]">
          <defs>
            <linearGradient id="track" x1="0" x2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <style>{`@keyframes move{0%{transform:translateX(0)}100%{transform:translateX(600px)}}`}</style>
          </defs>
          {/* Tracks */}
          {([40, 100, 160] as const).map((y, i) => (
            <g key={i}>
              <line x1="0" y1={y} x2="600" y2={y} stroke="url(#track)" strokeWidth="3" strokeOpacity="0.6" />
              {[...Array(12)].map((_, j) => (
                <rect key={j} x={j * 50} y={y - 4} width="30" height="8" fill="hsl(var(--border))" opacity="0.6" />
              ))}
            </g>
          ))}
          {/* Trains */}
          <g className="train" style={{ transformBox: "fill-box", transformOrigin: "0 0" }}>
            <rect x="0" y="32" width="40" height="16" rx="3" fill="#60a5fa" />
          </g>
          <g className="train" style={{ animationDelay: "-2s", transformBox: "fill-box", transformOrigin: "0 0" }}>
            <rect x="-200" y="92" width="36" height="16" rx="3" fill="#f59e0b" />
          </g>
          <g className="train" style={{ animationDelay: "-4s", transformBox: "fill-box", transformOrigin: "0 0" }}>
            <rect x="-380" y="152" width="32" height="16" rx="3" fill="#34d399" />
          </g>
        </svg>
      </div>
    </div>
  );
}
