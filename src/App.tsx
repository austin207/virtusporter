import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { features } from "./content/company";
import SiteLayout, { PageFallback } from "./components/layout/SiteLayout";
import SmoothScroll from "./components/layout/SmoothScroll";
import PageWipe from "./components/layout/PageWipe";
import Preloader from "./components/layout/Preloader";

// Route-level code splitting. The build-time prerenderer waits for these (renderToPipeableStream
// onAllReady), so every public page is still emitted as complete static HTML.
const Index = lazy(() => import("./pages/Index"));
const Service = lazy(() => import("./pages/Service"));
const Product = lazy(() => import("./pages/Product"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Founder = lazy(() => import("./pages/Founder"));
const EmployeeProducts = lazy(() => import("./pages/EmployeeProducts"));
const Cart = lazy(() => import("./pages/Cart"));
const PressKit = lazy(() => import("./pages/PressKit"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Auth = lazy(() => import("./pages/Auth"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Virtue = lazy(() => import("./pages/Virtue"));
const NotFound = lazy(() => import("./pages/NotFound"));
const VirtueChat = lazy(() => import("./components/chat/VirtueChat"));

/**
 * The floating chat widget everywhere except the full-page chat (it used to render twice there).
 * Only a tiny launcher ships with the page; the widget (markdown, syntax highlighting, KaTeX)
 * is downloaded on first click.
 */
function ChatWidget() {
  const { pathname } = useLocation();
  const [requested, setRequested] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 8) {
        setScrollingDown(y > last && y > 200 && window.innerWidth < 768);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    // step aside while the footer is on screen so the button never covers footer links
    const footer = document.getElementById("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);
  // Hidden on the full-page chat and on focused task flows where it would cover form buttons
  if (["/virtue", "/auth", "/forgot-password", "/cart"].some((p) => pathname.startsWith(p))) return null;
  if (!requested)
    return (
      <button
        type="button"
        onClick={() => setRequested(true)}
        onPointerEnter={() => import("./components/chat/VirtueChat")}
        aria-label={features.virtueAI ? "Open chat" : "Open FAQ assistant"}
        title={features.virtueAI ? "Chat with Virtue" : "Questions? Our FAQ assistant can help"}
        className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-[45] flex h-12 w-12 items-center sm:right-5 sm:h-14 sm:w-14 justify-center bg-accent text-accent-foreground transition-[background-color,opacity,transform] duration-300 hover:bg-accent-hover ${
          footerVisible || scrollingDown ? "pointer-events-none translate-y-4 opacity-0" : ""
        }`}
        tabIndex={footerVisible || scrollingDown ? -1 : 0}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      </button>
    );
  return (
    <Suspense fallback={null}>
      <VirtueChat defaultOpen />
    </Suspense>
  );
}

const App = () => {
  // One QueryClient per app instance (important for server rendering).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <Preloader />
          <SmoothScroll />
          <PageWipe />
          <Toaster />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/service" element={<Service />} />
                <Route path="/product" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/founders/:slug" element={<Founder />} />
                <Route path="/employee-products" element={<EmployeeProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/press-kit" element={<PressKit />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                {/* legacy / alias URLs */}
                <Route path="/services" element={<Navigate to="/service" replace />} />
                <Route path="/porter" element={<Navigate to="/product" replace />} />
                <Route path="/investor" element={<Navigate to="/contact?type=investor" replace />} />
                <Route path="/blog" element={<Navigate to="/press-kit" replace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<Navigate to="/auth" replace />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/virtue" element={<Virtue />} />
            </Routes>
          </Suspense>
          <ChatWidget />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
