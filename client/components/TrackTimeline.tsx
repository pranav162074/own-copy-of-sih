import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export type Train = {
  id: string;
  start: number; // 0-100 timeline units
  length: number; // duration in units
  lane: number; // track index
  label: string;
  category: "express" | "freight" | "suburban" | "special" | "maintenance";
  baselineStart?: number; // for simple delay calc
};

const colors: Record<Train["category"], string> = {
  express: "#60a5fa",
  freight: "#f59e0b",
  suburban: "#34d399",
  special: "#a78bfa",
  maintenance: "#f43f5e",
};

export default function TrackTimeline({
  trains: externalTrains,
  setTrains: externalSetTrains,
  lanes = 4,
}: {
  trains?: Train[];
  setTrains?: (trains: Train[]) => void;
  lanes?: number;
}) {
  const [internalTrains, setInternalTrains] = useState<Train[]>([
    { id: "12951", start: 10, length: 18, lane: 0, label: "EXP 12951", category: "express", baselineStart: 10 },
    { id: "G-203", start: 20, length: 14, lane: 1, label: "FR G-203", category: "freight", baselineStart: 20 },
    { id: "S-12", start: 8, length: 10, lane: 2, label: "SUB S-12", category: "suburban", baselineStart: 8 },
    { id: "M-BLK", start: 28, length: 12, lane: 3, label: "MAINT", category: "maintenance", baselineStart: 28 },
  ]);
  const trains = externalTrains ?? internalTrains;
  const setTrains = externalSetTrains ?? setInternalTrains;

  function clamp(x: number) {
    return Math.max(0, Math.min(100, x));
  }

  function onDrag(id: string, x: number, lane?: number) {
    setTrains((ts) =>
      ts.map((t) => (t.id === id ? { ...t, start: clamp(x), lane: lane ?? t.lane } : t))
    );
  }

  const conflicts = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < trains.length; i++) {
      for (let j = i + 1; j < trains.length; j++) {
        const a = trains[i];
        const b = trains[j];
        const sameLane = a.lane === b.lane;
        const overlap = a.start < b.start + b.length && b.start < a.start + a.length;
        if (sameLane && overlap) {
          set.add(a.id);
          set.add(b.id);
        }
      }
    }
    return set;
  }, [trains]);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>Section Control Gantt</span>
        <span>
          Drag to adjust • 0–100 timeline {conflicts.size > 0 && (
            <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" /> {conflicts.size} conflict{conflicts.size>1?"s":""}
            </span>
          )}
        </span>
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
        {trains.map((t) => {
          const glow = conflicts.has(t.id) ? `0 0 24px #f43f5e80, 0 0 0 2px #f43f5e80 inset` : `0 0 20px ${colors[t.category]}40`;
          return (
            <motion.div
              key={t.id}
              drag="x"
              dragMomentum={false}
              dragConstraints={{ left: 0, right: 500 }}
              onDrag={(_, info) => {
                const pct = (info.point.x - info.offset.x) / 5; // 500px -> 100 units
                onDrag(t.id, pct);
              }}
              className={`absolute top-0 h-8 cursor-grab active:cursor-grabbing rounded-md shadow ${conflicts.has(t.id) ? "animate-pulse" : ""}`}
              style={{
                left: `${t.start * 5}px`,
                width: `${t.length * 5}px`,
                top: `${t.lane * 40 + 4}px`,
                background: colors[t.category],
                boxShadow: glow,
              }}
              title={t.label}
            >
              <div className="px-2 text-xs font-semibold text-black/80 mix-blend-luminosity">{t.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
