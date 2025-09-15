import { motion } from "framer-motion";

export function KPI({ label, value, delta, color }: { label: string; value: string; delta: number; color?: string }) {
  const up = delta >= 0;
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-xl border bg-card p-4 shadow-[0_0_20px_hsl(var(--primary)/0.15)] hover-glow">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-2xl font-bold" style={{ color }}>{value}</div>
        <div className={up ? "text-emerald-400 text-xs" : "text-rose-400 text-xs"}>
          {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
        </div>
      </div>
    </motion.div>
  );
}
