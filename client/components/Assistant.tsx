import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hi! Ask about trains, conflicts, or optimization scenarios." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "ai", text: mockReply(text) }]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function mockReply(q: string) {
    if (/why/i.test(q)) return "Train 12951 was held to preserve headway after a crossing at Station A, minimizing cascading delays.";
    if (/compare|vs/i.test(q)) return "AI reduces average delay by 12% vs human plan in this scenario. See Dashboard → Scenario mode.";
    if (/depart|late/i.test(q)) return "If Train X departs 10 min late, AI suggests precedence swap at JN-14 with +2% throughput.";
    return "Try: 'Why was Train 12951 held at Station A?' or 'Compare human vs AI outcomes.'";
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-primary text-primary-foreground shadow-lg px-4 py-2 hover:opacity-90"
        aria-label="Toggle Assistant"
      >
        AI Assistant
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="mt-3 w-[320px] rounded-xl border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-3 py-2">
              <span className="text-sm font-semibold">RailFlow Assistant</span>
              <kbd className="text-xs text-muted-foreground">⌘K</kbd>
            </div>
            <div className="max-h-72 overflow-auto p-3 space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "ai" ? "text-sm" : "text-sm text-primary"}>
                  {m.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(inputRef.current?.value || "");
              }}
              className="flex gap-2 p-3 border-t"
            >
              <input ref={inputRef} placeholder="Ask a question…" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
