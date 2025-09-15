import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Assistant from "@/components/Assistant";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden className="text-primary">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#g)" strokeWidth="4" strokeLinecap="round">
          <path d="M6 44h36a10 10 0 0 0 10-10V18"/>
          <path d="M10 52h28M6 36h40M14 28h28" opacity="0.8"/>
          <circle cx="50" cy="50" r="6" fill="url(#g)" stroke="none"/>
          <circle cx="18" cy="52" r="6" fill="url(#g)" stroke="none"/>
        </g>
      </svg>
      <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">RailFlow AI</span>
    </Link>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function SiteLayout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur",
          scrolled ? "shadow-sm" : ""
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/control">Control</NavItem>
            <NavItem to="/model-lab">Model Lab</NavItem>
            <NavItem to="/anomalies">Anomalies</NavItem>
            <NavItem to="/audit">Audit</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/features">Features</NavItem>
            <NavItem to="/use-cases">Use Cases</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Assistant />

      <footer className="border-t bg-muted/40">
        <div className="container py-10 grid gap-8 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              AI-powered decision support to maximize section throughput and minimize train travel time while ensuring safety.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground">Capabilities</Link></li>
              <li><Link to="/use-cases" className="hover:text-foreground">Use Cases</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: hello@railflow.ai</li>
              <li>For inquiries, visit <Link to="/contact" className="hover:text-foreground underline">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} RailFlow AI. All rights reserved.</div>
      </footer>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="relative">
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
      >
        Menu
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border bg-background shadow-md">
          <nav className="flex flex-col p-1">
            <NavLink onClick={() => setOpen(false)} to="/" className="px-3 py-2 rounded-md hover:bg-muted">Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/dashboard" className="px-3 py-2 rounded-md hover:bg-muted">Dashboard</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/control" className="px-3 py-2 rounded-md hover:bg-muted">Control</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/model-lab" className="px-3 py-2 rounded-md hover:bg-muted">Model Lab</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/anomalies" className="px-3 py-2 rounded-md hover:bg-muted">Anomalies</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/audit" className="px-3 py-2 rounded-md hover:bg-muted">Audit</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className="px-3 py-2 rounded-md hover:bg-muted">About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/features" className="px-3 py-2 rounded-md hover:bg-muted">Features</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/use-cases" className="px-3 py-2 rounded-md hover:bg-muted">Use Cases</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className="px-3 py-2 rounded-md hover:bg-muted">Contact</NavLink>
          </nav>
        </div>
      )}
    </div>
  );
}
