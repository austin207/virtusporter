import { company } from '@/content/company';
import { faqs } from '@/content/about';
import { keyFacts } from '@/content/facts';

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'do', 'does', 'you', 'your', 'what', 'how', 'can', 'i', 'to', 'of', 'for', 'and', 'in', 'on', 'we', 'it', 'about', 'tell', 'me']);
const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

/**
 * Honest fallback when the AI backend is unreachable: say so, then answer from the site's own
 * published FAQ / facts when the question clearly matches one, otherwise point to a human.
 * Never invents an "AI" reply.
 */
export function offlineAnswer(question: string): string {
  const q = new Set(words(question));
  const score = (text: string) => words(text).filter((w) => q.has(w)).length;

  const candidates = [
    ...faqs.map((f) => ({ title: f.q, body: f.a, s: score(f.q) * 2 + score(f.a) })),
    ...keyFacts.map((f) => ({ title: f.label, body: f.value, s: score(f.label) * 2 + score(f.value) })),
  ].sort((a, b) => b.s - a.s);

  const header = `**Virtue is offline right now**, so I can't answer live. You can email us at [${company.email}](mailto:${company.email}) or use the [contact form](/contact).`;
  const best = candidates[0];
  if (!best || best.s < 2) return header;
  return `${header}\n\nFrom our published FAQ, this may help:\n\n**${best.title}**\n\n${best.body}`;
}
