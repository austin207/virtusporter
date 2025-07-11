
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/layout/LoadingScreen";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Service from "./pages/Service";
import About from "./pages/About";
//import Blog from "./pages/Blog";
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
import EmployeeProducts from "./pages/EmployeeProducts";
import Cart from "./pages/Cart";
import PressKit from "./pages/PressKit";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Virtue from './pages/Virtue';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading with a safety timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the timing as needed
    
    // Safety fallback in case the loading screen gets stuck
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // Force loading to end after 8 seconds
    
    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {isLoading && <LoadingScreen />}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product" element={<Product />} />
              <Route path="/service" element={<Service />} />
              <Route path="/about" element={<About />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<Navigate to="/auth" />} />
              <Route path="/founders/antony-austin" element={<FounderAntony />} />
              <Route path="/founders/alwin-george-thomas" element={<FounderAlwinGeorge />} />
              <Route path="/founders/azeem-kouther" element={<FounderAzeem />} />
              <Route path="/founders/allen-george-thomas" element={<FounderAllenGeorge />} />
              <Route path="/founders/danush-krishna" element={<FounderDanush />} />
              <Route path="/employee-products" element={<EmployeeProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/press-kit" element={<PressKit />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/virtue" element={<Virtue />}/>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <VirtueChat />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
