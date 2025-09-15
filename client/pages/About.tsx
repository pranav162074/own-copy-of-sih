import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="container py-12 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About the Project</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          AI-powered railway control for efficiency, punctuality, and safety. Built with a focus on explainability and operator trust.
        </p>
      </header>

      <div className="rounded-2xl border bg-card p-6 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
        <h2 className="text-lg font-semibold">Team Information</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3 items-start">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-base font-bold text-primary-foreground">RF</div>
            <div>
              <div className="font-semibold">RailFlow AI Team</div>
              <div className="text-sm text-muted-foreground">Lead: Systems & ML Engineer</div>
            </div>
          </div>
          <div className="md:col-span-2 grid gap-3 text-sm">
            <div className="rounded-xl border bg-background p-4">
              <div className="font-medium">Project Details</div>
              <div className="mt-2 grid gap-1 text-muted-foreground">
                <div>Problem Statement: Optimize section throughput and minimize delays with safety.</div>
                <div>Domain: Indian Railways traffic control</div>
                <div>Approach: Human-in-the-loop AI, simulation, explainability</div>
              </div>
            </div>
            <div className="rounded-xl border bg-background p-4 grid gap-2">
              <div className="font-medium">Project Highlights</div>
              <ul className="grid gap-1 text-muted-foreground list-disc pl-5">
                <li>Innovation Excellence — Hybrid rule-based + ML conflict resolution</li>
                <li>Quantified Impact — Demonstrable delay reduction and throughput gains</li>
                <li>User Experience — Intuitive controls with real-time explainable AI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Technology Stack</h2>
        <p className="text-sm text-muted-foreground mt-1">Modern, performant, and secure foundation.</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {["React","TypeScript","Vite","Tailwind","Framer Motion","Recharts","Express","Zod"].map((t)=> (
            <span key={t} className="rounded-full border px-3 py-1 bg-background">{t}</span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Project Vision</h2>
        <div className="mt-3 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-background p-4">
            <div className="font-medium">Mission</div>
            <p className="mt-1 text-sm text-muted-foreground">Leverage AI to safely increase capacity, reduce delays, and support controllers with transparent, explainable recommendations.</p>
          </div>
          <div className="rounded-xl border bg-background p-4">
            <div className="font-medium">Impact</div>
            <p className="mt-1 text-sm text-muted-foreground">Targeting double-digit delay reduction and measurable throughput improvements across congested sections while maintaining safety and compliance.</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-sm text-muted-foreground">
        Looking for integrations or a pilot? <Link to="/contact" className="underline hover:text-foreground">Contact us</Link>.
      </footer>
    </section>
  );
}
