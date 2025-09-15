import { useState } from "react";
import { motion } from "framer-motion";

type Train = { id: string; start: number; length: number; lane: number; label: string; category: "express"|"freight"|"suburban"|"special"|"maintenance" };

const colors: Record<Train["category"], string> = {
  express: "#60a5fa",
  freight: "#f59e0b",
  suburban: "#34d399",
  special: "#a78bfa",
  maintenance: "#f43f5e",
};

export default function TrackTimeline() {
  const [trains, setTrains] = useState<Train[]>([
    { id: "12951", start: 10, length: 18, lane: 0, label: "EXP 12951", category: "express" },
    { id: "G-203", start: 20, length: 14, lane: 1, label: "FR G-203", category: "freight" },
    { id: "S-12", start: 8, length: 10, lane: 2, label: "SUB S-12", category: "suburban" },
    { id: "M-BLK", start: 28, length: 12, lane: 3, label: "MAINT", category: "maintenance" },
  ]);

  function onDrag(id: string, x: number, lane?: number) {
    setTrains((ts) => ts.map((t) => (t.id === id ? { ...t, start: Math.max(0, Math.min(90, x)), lane: lane ?? t.lane } : t)));
  }

  const lanes = 4;
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>Section Control Gantt</span>
        <span>Drag to resolve conflicts • 0–100 timeline</span>
      </div>
      <div className="relative grid gap-2" style={{ gridTemplateRows: `repeat(${lanes}, 40px)` }}>
        {[...Array(lanes)].map((_, i) => (
          <div key={i} className="relative h-10 rounded-md bg-muted/40">
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}>
              {[...Array(10)].map((_, j) => (
                <div key={j} className="border-r border-border/60" />
              ))}
            </div>
          </div>
        ))}
        {trains.map((t) => (
          <motion.div
            key={t.id}
            drag="x"
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 500 }}
            onDrag={(_, info) => {
              const pct = (info.point.x - info.offset.x) / 5; // 500px -> 100 units
              onDrag(t.id, pct);
            }}
            className="absolute top-0 h-8 cursor-grab active:cursor-grabbing rounded-md shadow"
            style={{
              left: `${t.start * 5}px`,
              width: `${t.length * 5}px`,
              top: `${t.lane * 40 + 4}px`,
              background: colors[t.category],
              boxShadow: `0 0 20px ${colors[t.category]}40`,
            }}
            title={t.label}
          >
            <div className="px-2 text-xs font-semibold text-black/80 mix-blend-luminosity">{t.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
