import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Dev only: serve the generated crawler/LLM files (robots.txt, sitemap.xml, llms.txt,
 * llms-full.txt, *.md page twins) live from scripts/seo-content.ts, so they can be checked
 * on localhost. In production they are written to dist/ by `npm run build`.
 */
const llmFilesInDev = (): Plugin => ({
  name: "virtusco-llm-files-dev",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const rel = decodeURIComponent((req.url ?? "").split("?")[0]).replace(/^\//, "");
      if (!/^(robots\.txt|sitemap\.xml|llms(-full)?\.txt|[\w/-]+\.md)$/.test(rel)) return next();
      try {
        const { files } = (await server.ssrLoadModule("/scripts/seo-content.ts")) as { files: Record<string, string> };
        const body = files[rel];
        if (body === undefined) return next();
        const type = rel.endsWith(".xml") ? "application/xml" : rel.endsWith(".md") ? "text/markdown" : "text/plain";
        res.setHeader("Content-Type", `${type}; charset=utf-8`);
        res.end(body);
      } catch (e) {
        next(e);
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  plugins: [
    react(),
    llmFilesInDev(),
  ],
  build: {
    // lets scripts/prerender.ts modulepreload each page's own chunk (avoids hydration races)
    manifest: true,
  },
  ssr: {
    // CJS packages without proper ESM named exports get bundled into the prerender build
    noExternal: ['react-helmet-async'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
