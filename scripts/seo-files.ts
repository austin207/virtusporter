/** Writes the generated crawler/AI files (see seo-content.ts) into dist/. */
import { writeFileSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { files, summary } from './seo-content';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
for (const [rel, body] of Object.entries(files)) {
  const f = join(dist, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, body);
}
console.log(`  seo files: ${summary}`);

// House style guard: no em dashes anywhere in published pages or text files.
const offenders: string[] = [];
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const f = join(dir, name);
    if (statSync(f).isDirectory()) {
      if (name !== 'assets') walk(f);
    } else if (/\.(html|txt|md|xml|webmanifest)$/.test(name) && readFileSync(f, 'utf-8').includes('\u2014')) {
      offenders.push(f.slice(dist.length + 1));
    }
  }
};
walk(dist);
if (offenders.length) {
  console.error(`  em dash found in: ${offenders.join(', ')}`);
  process.exit(1);
}
