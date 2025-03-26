
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Service from "./pages/Service";
import About from "./pages/About";
import Investor from "./pages/Investor";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import VirtueChat from "./components/chat/VirtueChat";
import ScrollToTop from "./components/layout/ScrollToTop";
import FounderAntony from "./pages/founders/FounderAntony";
import FounderAlwinGeorge from "./pages/founders/FounderAlwinGeorge";
import FounderAzeem from "./pages/founders/FounderAzeem";
import FounderAllenGeorge from "./pages/founders/FounderAllenGeorge";
import FounderDanush from "./pages/founders/FounderDanush";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product" element={<Product />} />
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/investor" element={<Investor />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/founders/antony-austin" element={<FounderAntony />} />
            <Route path="/founders/alwin-george-thomas" element={<FounderAlwinGeorge />} />
            <Route path="/founders/azeem-kouther" element={<FounderAzeem />} />
            <Route path="/founders/allen-george-thomas" element={<FounderAllenGeorge />} />
            <Route path="/founders/danush-krishna" element={<FounderDanush />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <VirtueChat />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
