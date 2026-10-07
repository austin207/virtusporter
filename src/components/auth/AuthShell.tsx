import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/layout/Logo";
import { Eyebrow } from "@/components/ox/primitives";

type AuthShellProps = {
  /** Mono label above the panel heading */
  eyebrow: string;
  /** Two-tone panel heading: `ink` in light, `mut` faded */
  ink: string;
  mut?: string;
  lede?: string;
  children: ReactNode;
};

/** Split-screen shell for the standalone auth pages: dark brand panel left, paper form panel right. */
const AuthShell = ({ eyebrow, ink, mut, lede, children }: AuthShellProps) => {
  return (
    <div className="grid min-h-svh bg-paper text-ink lg:grid-cols-[0.95fr_1.05fr]">
      <aside
        data-tone="dark"
        className="on-dark relative flex flex-col justify-between gap-16 overflow-hidden bg-ink px-[var(--gutter-hero)] py-8 text-light lg:sticky lg:top-0 lg:h-svh"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgb(var(--light) / .22) 0.7px, transparent 0.9px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(80% 90% at 85% 10%, #000 0%, transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between gap-6">
          <Link to="/" aria-label="VirtusCo home" className="text-light">
            <Logo />
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-soft transition-colors hover:text-light"
          >
            <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to site
          </Link>
        </div>

        <div className="relative pb-4 lg:pb-[clamp(40px,8vh,96px)]">
          <Eyebrow dot className="mb-6 text-light/70">
            {eyebrow}
          </Eyebrow>
          <h1 className="h-page max-w-[16ch]">
            <span className="text-light">{ink}</span>
            {mut && (
              <>
                {" "}
                <span className="text-quiet">{mut}</span>
              </>
            )}
          </h1>
          {lede && <p className="lede mt-6 text-soft">{lede}</p>}
        </div>
      </aside>

      <main data-tone="light" className="flex items-center justify-center px-6 py-14 sm:px-10 lg:py-20">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>
    </div>
  );
};

export default AuthShell;
