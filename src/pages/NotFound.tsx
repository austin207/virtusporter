import { useLocation } from 'react-router-dom';
import Seo from '@/seo/Seo';
import { Eyebrow, OxLink } from '@/components/ox/primitives';
import PixelIcon from '@/components/ox/PixelIcon';

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <Seo path={location.pathname} title="Page not found" description="The page you are looking for does not exist." image="/og/home.png" noindex />
      <section data-tone="dark" className="on-dark flex min-h-[100svh] items-end bg-ink px-[var(--gutter-hero)] pb-[clamp(56px,12vh,130px)] pt-40 text-light">
        <div className="grid w-full gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow dot className="mb-6 text-light/70">
              Error 404
            </Eyebrow>
            <h1 className="h-page text-light">
              Oops! Page not found<span className="ox-caret blink" aria-hidden />
            </h1>
            <p className="lede mt-6 text-soft">The robot searched every aisle. This route doesn&apos;t exist. It may have moved during our redesign.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <OxLink to="/" variant="cream">
                Return to Home
              </OxLink>
              <OxLink to="/service" variant="outline">
                Our services
              </OxLink>
            </div>
          </div>
          <PixelIcon art="custom" invert className="hidden h-44 w-44 md:block" />
        </div>
      </section>
    </>
  );
};

export default NotFound;
