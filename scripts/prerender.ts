/**
 * Post-build static prerender. Run after `vite build` (client → dist/) and
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 *
 * Emits:
 *  - dist/<route>/index.html for every public route (full content + per-page head/JSON-LD)
 *  - dist/404.html (real 404 status on Vercel)
 *  - dist/_shell.html (empty SPA shell for client-only routes like /cart, /auth, /virtue)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { publicRoutes } from '../src/content/routes';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
// Preload the two faces used above the fold (hashed filenames): Manrope headings, Newsreader body.
const assets = readdirSync(join(dist, 'assets'));
const preloads = [/^manrope-latin-wght-normal.*\.woff2$/, /^newsreader-latin-wght-normal.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `  <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n');
const template = readFileSync(join(dist, 'index.html'), 'utf-8').replace('</head>', `${preloads}\n  </head>`);

const HEAD_RE = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;

// Route -> page module, so each prerendered page can modulepreload its own lazy chunk (+ imports)
const manifest = JSON.parse(readFileSync(join(dist, '.vite', 'manifest.json'), 'utf-8')) as Record<string, { file: string; imports?: string[] }>;
const pageModule = (path: string) =>
  path === '/' ? 'src/pages/Index.tsx'
  : path.startsWith('/founders/') ? 'src/pages/Founder.tsx'
  : path === '/__not-found__' ? 'src/pages/NotFound.tsx'
  : `src/pages/${{ '/service': 'Service', '/product': 'Product', '/about': 'About', '/contact': 'Contact', '/press-kit': 'PressKit', '/privacy-policy': 'PrivacyPolicy', '/terms-of-service': 'TermsOfService' }[path]}.tsx`;
function preloadsFor(path: string) {
  const seen = new Set<string>();
  const walk = (key: string) => {
    const m = manifest[key];
    if (!m || seen.has(m.file)) return;
    seen.add(m.file);
    (m.imports ?? []).forEach(walk);
  };
  walk(pageModule(path));
  return [...seen].map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`).join('\n');
}

async function main() {
  const { render } = (await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)) as {
    render: (url: string) => Promise<{ html: string; head: string }>;
  };

  // SPA shell for client-only routes: default head + noindex, empty root.
  const shell = template.replace(HEAD_RE, (m) => `${m.replace(/<!--\/?app-head-->/g, '')}\n    <meta name="robots" content="noindex, follow" />`).replace('<!--app-html-->', '');
  writeFileSync(join(dist, '_shell.html'), shell);

  const pages = [...publicRoutes.map((r) => r.path), '/__not-found__'];
  for (const path of pages) {
    const { html, head } = await render(path);
    if (!html.includes('<main') && path !== '/__not-found__') throw new Error(`prerender produced no <main> for ${path}`);
    const doc = template.replace(HEAD_RE, `${head}\n${preloadsFor(path)}`).replace('<!--app-html-->', html);
    const file = path === '/__not-found__' ? join(dist, '404.html') : path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, doc);
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    console.log(`  prerendered ${path.padEnd(34)} ${String(words).padStart(5)} words`);
  }
  rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
  rmSync(join(dist, '.vite'), { recursive: true, force: true }); // build manifest: internal only
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
