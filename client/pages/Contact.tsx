import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Request failed");
      setStatus("Thanks! We'll get back to you shortly.");
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Have questions or want a demo? Send us a message and our team will reach out.
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-xl">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input id="name" name="name" required className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={5} required className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button disabled={loading} className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 disabled:opacity-50">
          {loading ? "Sending..." : "Send"}
        </button>
        {status && <p className="text-sm text-muted-foreground">{status}</p>}
      </form>
    </section>
  );
}
