export default function Anomalies() {
  return (
    <section className="container py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Anomaly Explorer</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {["Cascading delays", "Signaling bottleneck", "Unexpected dwell"].map((t)=> (
          <div key={t} className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-muted-foreground mt-1">Detected pattern with confidence 0.{Math.floor(Math.random()*9)+1}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
