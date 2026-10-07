import { Helmet } from 'react-helmet-async';
import { company } from '@/content/company';
import { abs, graph, ogKey, webPage } from './schema';

const MD_PAGES = ['/', '/service', '/product', '/about', '/contact'];

interface SeoProps {
  path: string;
  title: string; // page title without brand suffix
  description: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'ProfilePage' | 'CollectionPage' | 'FAQPage';
  ogType?: 'website' | 'article' | 'profile' | 'product';
  image?: string;
  noindex?: boolean;
  schema?: object[];
  keywords?: string[];
}

/** Per-route <head>: title, description, canonical, OG/Twitter, robots and a JSON-LD @graph. */
export default function Seo({ path, title, description, type = 'WebPage', ogType = 'website', image, noindex, schema = [], keywords }: SeoProps) {
  const url = abs(path);
  const fullTitle = path === '/' || title.includes(company.name) ? title : `${title} | ${company.name}`;
  const img = abs(image ?? `/og/${ogKey(path)}.png`);
  // Markdown twins exist only for the main pages and founder profiles (scripts/seo-content.ts)
  const hasMd = !noindex && (MD_PAGES.includes(path) || path.startsWith('/founders/'));
  const ld = graph(webPage({ path, title: fullTitle, description, type }), ...schema);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {!noindex && <link rel="canonical" href={url} />}
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'}
      />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:type" content={ogType} />
      {!noindex && <meta property="og:url" content={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={company.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {hasMd && <link rel="alternate" type="text/markdown" href={abs(path === '/' ? '/index.md' : `${path}.md`)} title="Markdown version" />}
      {!noindex && <script type="application/ld+json">{JSON.stringify(ld)}</script>}
    </Helmet>
  );
}
