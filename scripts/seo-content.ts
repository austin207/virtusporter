/**
 * Crawler/AI-facing files built from src/content (single source of truth):
 *   robots.txt, sitemap.xml, llms.txt, llms-full.txt and a Markdown twin of every public page
 *   (/index.md, /service.md, /founders/<slug>.md …) for answer engines and LLM agents.
 * Pure module: `files` maps published path → body. Written to dist/ by scripts/seo-files.ts and
 * served live by the dev server (vite.config.ts) so they can be previewed on localhost.
 */
import { SITE_URL, company, addressLine, footerLinks } from '../src/content/company';
import { services, approach, budget, serviceHero, homeHero, homeChapters, servicesIntro } from '../src/content/services';
import { porter, porterGroups } from '../src/content/porter';
import { founders, teamIntro } from '../src/content/team';
import { aboutHero, democratizing, story, timeline, values, future, faqs, contactHero } from '../src/content/about';
import { publicRoutes, appRoutes } from '../src/content/routes';
import { keyFacts } from '../src/content/facts';

import { execSync } from 'node:child_process';

const today = new Date().toISOString().slice(0, 10);

// Real freshness: last commit date of the files behind each page (today if they have uncommitted edits).
const routeSources: Record<string, string[]> = {
  '/': ['src/pages/Index.tsx', 'src/content/services.ts', 'src/content/porter.ts', 'src/content/team.ts'],
  '/service': ['src/pages/Service.tsx', 'src/content/services.ts'],
  '/product': ['src/pages/Product.tsx', 'src/content/porter.ts'],
  '/about': ['src/pages/About.tsx', 'src/content/about.ts', 'src/content/facts.ts', 'src/content/team.ts'],
  '/contact': ['src/pages/Contact.tsx', 'src/content/about.ts', 'src/content/company.ts'],
  '/press-kit': ['src/pages/PressKit.tsx', 'src/content/pressKit.ts'],
  '/privacy-policy': ['src/pages/PrivacyPolicy.tsx'],
  '/terms-of-service': ['src/pages/TermsOfService.tsx'],
};
function lastmod(path: string) {
  const files = routeSources[path] ?? (path.startsWith('/founders/') ? ['src/pages/Founder.tsx', 'src/content/team.ts'] : []);
  if (!files.length) return today;
  try {
    const q = files.map((f) => `"${f}"`).join(' ');
    if (execSync(`git status --porcelain -- ${q}`, { encoding: 'utf-8' }).trim()) return today;
    return execSync(`git log -1 --format=%cs -- ${q}`, { encoding: 'utf-8' }).trim() || today;
  } catch {
    return today;
  }
}
export const files: Record<string, string> = {};
const out = (rel: string, body: string) => {
  files[rel] = body.trimStart().replace(/\n{3,}/g, '\n\n');
};
const url = (p: string) => `${SITE_URL}${p === '/' ? '/' : p}`;

/* ------------------------------------------------------------------ robots.txt */
// Explicitly welcome search engines AND AI crawlers / answer engines (training + live retrieval).
const aiAgents = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'GoogleOther', 'Googlebot', 'Bingbot', 'DuckDuckBot', 'DuckAssistBot',
  'Applebot', 'Applebot-Extended', 'Amazonbot', 'Meta-ExternalAgent', 'Meta-ExternalFetcher', 'FacebookBot', 'facebookexternalhit',
  'CCBot', 'cohere-ai', 'cohere-training-data-crawler', 'Bytespider', 'YouBot', 'MistralAI-User', 'PhindBot', 'Diffbot',
  'Timpibot', 'ImagesiftBot', 'Twitterbot', 'LinkedInBot', 'Slackbot', 'Discordbot', 'TelegramBot', 'WhatsApp',
];
const disallow = ['/cart', '/auth', '/forgot-password', '/virtue', '/_shell.html'];
out(
  'robots.txt',
  `# VirtusCo: robotics engineering company, Kochi, India. Humans and AI agents welcome.
# LLM-friendly summary: ${SITE_URL}/llms.txt  ·  full text: ${SITE_URL}/llms-full.txt

${aiAgents.map((a) => `User-agent: ${a}`).join('\n')}
Allow: /
${disallow.map((d) => `Disallow: ${d}`).join('\n')}

User-agent: *
Allow: /
${disallow.map((d) => `Disallow: ${d}`).join('\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`,
);

/* ------------------------------------------------------------------ sitemap.xml */
const imgFor: Record<string, { loc: string; title: string }[]> = {
  '/': [{ loc: url('/og/home.png'), title: 'VirtusCo robotics engineering' }],
  '/product': [{ loc: url(porter.image), title: 'VirtusCo autonomous porter robot' }],
  ...Object.fromEntries(founders.map((f) => [`/founders/${f.slug}`, [{ loc: url(f.image), title: f.name }]])),
};
out(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${publicRoutes
  .map(
    (r) => `  <url>
    <loc>${url(r.path)}</loc>
    <lastmod>${lastmod(r.path)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(2)}</priority>${(imgFor[r.path] ?? [])
      .map((i) => `\n    <image:image><image:loc>${i.loc}</image:loc><image:title>${i.title}</image:title></image:image>`)
      .join('')}
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

/* ------------------------------------------------------------------ Markdown twins */
const faqMd = (topic?: 'services' | 'porter') =>
  faqs
    .filter((f) => !topic || f.topic === topic)
    .map((f) => `### ${f.q}\n\n${f.a}`)
    .join('\n\n');

const md: Record<string, string> = {};

md['/'] = `# ${company.name}: robotics engineering company in ${company.address.city}, ${company.address.region}

> ${company.shortDescription}

## ${homeHero.title}

${homeHero.lede}

## ${homeChapters[0].title}

${homeChapters[0].body.join('\n\n')}

## ${democratizing.title}

${democratizing.lede}

${company.vision}

## How we work

${approach.map((s) => `${s.n}. **${s.title}:** ${s.description}`).join('\n')}

## ${servicesIntro.eyebrow}

${services.map((s) => `- **[${s.title}](${url('/service')}#${s.id})**: ${s.description}`).join('\n')}

## ${budget.eyebrow}

${budget.lede}

${budget.tiers.map((t) => `- **${t.title}** (${t.fit.toLowerCase()}): ${t.body}`).join('\n')}

## Product in development: ${porter.name}

${porter.lede} [Learn more](${url('/product')}).

## Team

${founders.map((f) => `- **[${f.name}](${url(`/founders/${f.slug}`)})**, ${f.title}. ${f.summary}`).join('\n')}

## Contact

- Email: ${company.email}
- Phone: ${company.phones[0].display}
- Address: ${addressLine}
`;

md['/service'] = `# ${serviceHero.title}

> ${serviceHero.lede}

${services
  .map(
    (s) => `## ${s.title}

${s.description}

${s.features.map((f) => `- ${f}`).join('\n')}`,
  )
  .join('\n\n')}

## Our approach

${approach.map((s) => `${s.n}. **${s.title}:** ${s.description}`).join('\n')}

## ${budget.eyebrow}

${budget.lede}

**${budget.flexible.title}.** ${budget.flexible.body}

${budget.tiers.map((t) => `- **${t.title}** (${t.fit.toLowerCase()}): ${t.body}`).join('\n')}

${budget.closing}

## FAQ

${faqMd('services')}
`;

md['/product'] = `# ${porter.title}

**Status: ${porter.status}.**

> ${porter.lede}

${porterGroups
  .map(
    (g) => `## ${g.label}

${g.items.map((i) => `### ${i.title}\n\n${i.description}`).join('\n\n')}`,
  )
  .join('\n\n')}

## FAQ

${faqMd('porter')}
`;

md['/about'] = `# ${aboutHero.title}

> ${aboutHero.lede}

## ${democratizing.title}

${democratizing.lede}

${company.vision}

## ${story.title}

${story.paragraphs.join('\n\n')}

## Timeline

${timeline.map((t) => `- **${t.date}:** ${t.label}`).join('\n')}

## What drives us

${values.map((v) => `- **${v.title}:** ${v.description}`).join('\n')}

## ${teamIntro.title}

${teamIntro.lede}

${founders.map((f) => `- **[${f.name}](${url(`/founders/${f.slug}`)})**, ${f.title}. ${f.summary}`).join('\n')}

## ${future.title}

${future.paragraphs.join('\n\n')}

${future.initiatives.map((i) => `- **${i.title}:** ${i.body}`).join('\n')}
`;

md['/contact'] = `# Contact ${company.name}

${contactHero.servicesLede}

- Email: ${company.email}
${company.phones.map((p) => `- ${p.label}: ${p.display}`).join('\n')}
- Address: ${company.address.name}, ${addressLine}
${company.socials.map((s) => `- ${s.label}: ${s.url}`).join('\n')}

## Frequently asked questions

${faqMd()}
`;

founders.forEach((f) => {
  md[`/founders/${f.slug}`] = `# ${f.name}, ${f.title}, ${company.name}

${f.paragraphs.join('\n\n')}

> ${f.quote}

Expertise: ${f.expertise.join(', ')}.
${f.socials.length ? `\nProfiles: ${f.socials.map((s) => s.url).join(' · ')}` : ''}
`;
});

Object.entries(md).forEach(([path, body]) => out(path === '/' ? 'index.md' : `${path.slice(1)}.md`, body));

/* ------------------------------------------------------------------ llms.txt (llmstxt.org) */
out(
  'llms.txt',
  `# ${company.name}

> ${company.shortDescription} The company also develops an autonomous porter robot for airports (in development). Founded in ${company.foundingDate.slice(0, 4)} by five engineers from Rajagiri School of Engineering & Technology.

Last updated: ${today}

## Key facts

${keyFacts.map((f) => `- **${f.label}:** ${f.value}`).join('\n')}

## Disambiguation

${company.name} (virtusco.in) is an Indian robotics engineering company based in Kochi, Kerala. It is not affiliated with other businesses that use the name "Virtus" (for example in finance, healthcare or software).

## When citing

Please refer to us as "${company.name}, a robotics engineering company in Kochi, India" and link to ${SITE_URL}. Product details describe the autonomous porter robot as a product in development, not a shipping product.

## Pages

- [Home](${url('/index.md')}): who we are, how we work, services overview
- [Services](${url('/service.md')}): ROS development, custom robotics solutions, system integration, AI & machine learning; approach and budget tiers
- [Autonomous Porter robot](${url('/product.md')}): proposed airport baggage robot: features, technology, sustainability
- [About](${url('/about.md')}): story, timeline, values, founding team
- [Contact & FAQ](${url('/contact.md')}): contact details and frequently asked questions

## Team

${founders.map((f) => `- [${f.name}](${url(`/founders/${f.slug}.md`)}): ${f.title}`).join('\n')}

## Optional

- [Full site text](${url('/llms-full.txt')}): every page above in one Markdown file
- [Press kit](${url('/press-kit')})
- [Privacy policy](${url('/privacy-policy')}) · [Terms of service](${url('/terms-of-service')})
`,
);

out(
  'llms-full.txt',
  `# ${company.name} full site content (${today})

Source: ${SITE_URL}

${['/', '/service', '/product', '/about', '/contact', ...founders.map((f) => `/founders/${f.slug}`)]
  .map((p) => `---\n\nURL: ${url(p)}\n\n${md[p]}`)
  .join('\n\n')}
`,
);

// sanity: footer links must all resolve to known routes/anchors
const known = new Set([...publicRoutes.map((r) => r.path), ...appRoutes]);
footerLinks.forEach((c) =>
  c.links.forEach((l) => {
    const p = l.path.split(/[?#]/)[0];
    if (!known.has(p)) throw new Error(`footer link to unknown route: ${l.path}`);
  }),
);

export const summary = `robots.txt, sitemap.xml (${publicRoutes.length} urls), llms.txt, llms-full.txt, ${Object.keys(md).length} .md twins`;
