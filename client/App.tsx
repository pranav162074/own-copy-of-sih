import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SiteLayout from "@/components/SiteLayout";
import About from "./pages/About";
import Features from "./pages/Features";
import UseCases from "./pages/UseCases";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Control from "./pages/Control";
import ModelLab from "./pages/ModelLab";
import Anomalies from "./pages/Anomalies";
import Audit from "./pages/Audit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/control" element={<Control />} />
            <Route path="/model-lab" element={<ModelLab />} />
            <Route path="/anomalies" element={<Anomalies />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
