// Public, indexable routes. Drives prerendering, sitemap.xml, llms.txt and the .md page twins.
import { founders } from './team';

export interface PublicRoute {
  path: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const publicRoutes: PublicRoute[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/service', priority: 0.95, changefreq: 'monthly' },
  { path: '/product', priority: 0.85, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  ...founders.map((f) => ({ path: `/founders/${f.slug}`, priority: 0.6, changefreq: 'monthly' as const })),
  { path: '/press-kit', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.2, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.2, changefreq: 'yearly' },
];

/** Client-only app routes: served from the empty SPA shell and kept out of search indexes. */
// /employee-products is backend-dependent, so it is served from the SPA shell (noindex) until it has live content.
export const appRoutes = ['/employee-products', '/cart', '/auth', '/auth/callback', '/forgot-password', '/virtue'];
