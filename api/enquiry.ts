// Vercel function: forwards a website enquiry (or newsletter sign-up) to Forge, VirtusCo's project tool, where it
// becomes an issue in "Website enquiries" (or a subscribed contact). The browser posts here; this signs the request
// with PM_INTAKE_SECRET so the secret never reaches the page. Email delivery (FormSubmit) is separate and unaffected.
//   POST /api/enquiry  { id, kind, name, email, phone, company, inquiry_type, subject, message, page }
// Env: PM_INTAKE_URL (https://forge.virtusco.in/api/intake/website-enquiry), PM_INTAKE_SECRET.
import { createHmac } from 'node:crypto';

const TYPES = ['General Inquiry', 'Robotics Project / Consultation', 'Request a Demo', 'Partnership Opportunity', 'Investor Relations', 'Technical Support'];
const LIMITS: Record<string, number> = { name: 120, email: 254, phone: 30, company: 120, subject: 160, message: 5000, page: 300 };
const ORIGIN = /^https:\/\/((www\.)?virtusco\.in|[a-z0-9-]+\.vercel\.app)$/i;

// Best effort per instance: a burst from one address is turned away (Forge also deduplicates by id).
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 8;
}

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const text = (v: unknown, max: number): string | null => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null);

export async function POST(request: Request): Promise<Response> {
  const url = process.env.PM_INTAKE_URL;
  const secret = process.env.PM_INTAKE_SECRET;
  if (!url || !secret) return json(503, { ok: false, error: 'Not configured.' });
  const origin = request.headers.get('origin') ?? '';
  if (origin && !ORIGIN.test(origin)) return json(403, { ok: false, error: 'Forbidden.' });
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return json(429, { ok: false, error: 'Too many requests.' });

  const raw = await request.text();
  if (raw.length > 20_000) return json(413, { ok: false, error: 'Too large.' });
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'Bad JSON.' });
  }
  const kind = b.kind === 'newsletter' ? 'newsletter' : 'contact';
  const id = typeof b.id === 'string' && /^[\w.:-]{8,90}$/.test(b.id) ? b.id : null;
  const email = text(b.email, LIMITS.email);
  if (!id || !email) return json(400, { ok: false, error: 'Missing id or email.' });
  const body = JSON.stringify({
    id: `web-${id}`,
    kind,
    submitted_at: new Date().toISOString(),
    name: text(b.name, LIMITS.name),
    email,
    phone: text(b.phone, LIMITS.phone),
    company: text(b.company, LIMITS.company),
    inquiry_type: kind === 'contact' && TYPES.includes(String(b.inquiry_type)) ? String(b.inquiry_type) : null,
    subject: kind === 'contact' ? text(b.subject, LIMITS.subject) : null,
    message: kind === 'contact' ? text(b.message, LIMITS.message) : null,
    page: text(b.page, LIMITS.page) ?? '/',
  });
  const ts = String(Math.floor(Date.now() / 1000));
  const signature = `sha256=${createHmac('sha256', secret).update(`${ts}.${body}`).digest('hex')}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-VirtusCo-Timestamp': ts, 'X-VirtusCo-Signature': signature },
      body,
      signal: AbortSignal.timeout(8000),
    });
    const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    // Ids and status only: the person's details stay out of the logs.
    if (!res.ok) console.warn(`[enquiry] Forge answered ${res.status} for ${id}: ${out.error ?? ''}`);
    return json(res.ok ? 200 : 502, { ok: res.ok });
  } catch (e) {
    console.warn(`[enquiry] Forge unreachable for ${id}: ${(e as Error).message}`);
    return json(502, { ok: false });
  }
}
