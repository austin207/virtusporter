import { company } from '@/content/company';

/**
 * Delivers website form submissions to the company inbox via FormSubmit (formsubmit.co):
 * no backend or API key needed. The first submission ever sends an activation email to
 * company.email; until that link is clicked, submissions fail and callers fall back.
 */
export async function sendForm(subject: string, fields: Record<string, string | undefined>): Promise<void> {
  const body: Record<string, string> = { _subject: subject, _template: 'table', _captcha: 'false' };
  for (const [k, v] of Object.entries(fields)) if (v) body[k] = v;
  const res = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || `Form service error ${res.status}`);
}
