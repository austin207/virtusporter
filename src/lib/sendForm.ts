import { company } from '@/content/company';

/**
 * Delivers website form submissions to the company inbox via FormSubmit (formsubmit.co):
 * no backend or API key needed. The first submission ever sends an activation email to
 * company.email; until that link is clicked, submissions fail and callers fall back.
 * Each submission is also passed to Forge, the project tool (see /api/enquiry), where it becomes a
 * work item; that is best effort and never decides whether the visitor sees success.
 */
export async function sendForm(subject: string, fields: Record<string, string | undefined>): Promise<void> {
  const body: Record<string, string> = { _subject: subject, _template: 'table', _captcha: 'false' };
  for (const [k, v] of Object.entries(fields)) if (v) body[k] = v;
  const forge = toForge(fields);
  const res = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  await forge;
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || `Form service error ${res.status}`);
}

/** Sends the submission to /api/enquiry (which signs it for Forge). Never throws. */
async function toForge(fields: Record<string, string | undefined>): Promise<void> {
  try {
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        id,
        kind: fields.list === 'newsletter' ? 'newsletter' : 'contact',
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        company: fields.company,
        inquiry_type: fields.inquiry_type,
        subject: fields.subject,
        message: fields.message,
        page: fields.page ?? (typeof window !== 'undefined' ? window.location.pathname : '/'),
      }),
    });
  } catch {
    // The email still goes out; Forge just won't have this one.
  }
}
