import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideRail from './SideRail';

export function PageFallback() {
  return <div className="min-h-[100svh] bg-ink" aria-busy="true" />;
}

/** Shared chrome for every marketing/app page (not /auth, /virtue or 404). */
const SiteLayout = () => (
  <>
    <Header />
    <main id="main" tabIndex={-1} className="outline-none">
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </main>
    {/* after <main> so its buttons don't precede page content in keyboard order */}
    <SideRail />
    <Footer />
  </>
);

export default SiteLayout;
