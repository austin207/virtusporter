// Built-in press assets: always available (prerendered), independent of the Supabase backend.
// Items from the `press_kit` table are appended when the backend is reachable.
import type { PressKitItem } from '@/services/types';
import { founders } from './team';
import { porter } from './porter';

const item = (id: string, category: string, file_type: string, title: string, description: string, file_url: string, thumbnail_url: string | null = file_url): PressKitItem => ({
  id: `static-${id}`,
  title,
  description,
  file_url,
  thumbnail_url,
  file_type,
  category,
  created_at: '2026-10-07',
  updated_at: '2026-10-07',
});

export const staticPressKit: PressKitItem[] = [
  item('logo', 'brand', 'image', 'VirtusCo logo (PNG, transparent)', 'Official logo for light backgrounds. Keep clear space around it equal to the red core.', '/brand/virtusco-logo.png'),
  item('logo-dark', 'brand', 'image', 'VirtusCo logo for dark backgrounds (PNG)', 'Light version of the official logo for dark backgrounds; the red core is unchanged.', '/brand/virtusco-logo-dark.png'),
  item('logo-white', 'brand', 'image', 'VirtusCo logo on white (PNG)', 'Official logo on a solid white background.', '/brand/virtusco-logo-white.png'),
  item('og-home', 'brand', 'image', 'Brand card (PNG, 1200 × 630)', 'Social and press header image.', '/og/home.png'),
  item('porter', 'product', 'image', `${porter.name} concept render`, 'Concept render of the autonomous porter robot (in development). Please caption as a concept.', porter.image),
  ...founders.map((f) =>
    // download = original photo; card thumbnail = small WebP
    item(`founder-${f.slug}`, 'team', 'image', `${f.name} portrait`, `${f.title.replace(' · ', ', ')}, VirtusCo.`, f.image, `/team/${f.image.replace(/^\//, '').replace(/\.\w+$/, '').toLowerCase()}-400.webp`),
  ),
  item('facts', 'company', 'text', 'Company fact sheet (Markdown)', 'Story, timeline, values and founding team in plain text.', '/about.md', null),
  item('llms', 'company', 'text', 'Site summary (llms.txt)', 'Key facts and page index, also used by AI assistants.', '/llms.txt', null),
];
