import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSupabase } from '@/integrations/supabase/lazy';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { inquiryTypes } from '@/content/about';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(120).optional(),
  inquiryType: z.enum(inquiryTypes),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Please accept the privacy policy' }) }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const typeFromQuery: Record<string, (typeof inquiryTypes)[number]> = {
  investor: 'Investor Relations',
  demo: 'Request a Demo',
  porter: 'Request a Demo',
  project: 'Robotics Project / Consultation',
  partner: 'Partnership Opportunity',
  support: 'Technical Support',
};

/**
 * Contact form → Supabase `feedback` table. The table only has name/email/message, so the extra
 * fields are folded into a structured message header.
 */
const ContactForm = ({ compact = false, className }: { compact?: boolean; className?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [params] = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: user?.email ?? '',
      phone: '',
      company: '',
      inquiryType: 'General Inquiry',
      subject: '',
      message: '',
    },
  });

  useEffect(() => {
    const t = params.get('type');
    if (t && typeFromQuery[t]) setValue('inquiryType', typeFromQuery[t]);
  }, [params, setValue]);

  const onSubmit = async (v: ContactFormValues) => {
    setIsSubmitting(true);
    const header = [
      `[${v.inquiryType}]${v.subject ? ` ${v.subject}` : ''}`,
      v.company ? `Company: ${v.company}` : null,
      v.phone ? `Phone: ${v.phone}` : null,
      `Page: ${typeof window !== 'undefined' ? window.location.pathname : ''}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from('feedback').insert({
        user_id: user?.id || null,
        name: v.name,
        email: v.email,
        message: `${header}\n\n${v.message}`,
      });
      if (error) throw error;
      toast({
        title: 'Thank you!',
        description: "Your message has been sent successfully. We'll get back to you soon.",
      });
      reset();
      setSent(true);
    } catch (error) {
      console.warn('Error submitting feedback:', error);
      // Never lose an enquiry: fall back to the visitor's email client with everything pre-filled.
      const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`[${v.inquiryType}] ${v.subject || 'Website enquiry'}`)}&body=${encodeURIComponent(`${header}\n\nFrom: ${v.name} <${v.email}>\n\n${v.message}`)}`;
      toast({
        title: 'Opening your email app instead',
        description: `We couldn't reach our server, so your message is ready to send from your email to ${company.email}.`,
      });
      window.location.href = mailto;
    } finally {
      setIsSubmitting(false);
    }
  };

  const err = (k: keyof ContactFormValues) =>
    errors[k] ? (
      <p id={`cf-${k}-error`} role="alert" className="mt-1.5 font-mono text-[11px] tracking-wide text-accent-ink">
        {errors[k]?.message as string}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2', className)}>
      <div>
        <label htmlFor="cf-name" className="field-label">
          Full name *
        </label>
        <input id="cf-name" autoComplete="name" className="field" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-error' : undefined} {...register('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="cf-email" className="field-label">
          Email *
        </label>
        <input id="cf-email" type="email" autoComplete="email" className="field" placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-error' : undefined} {...register('email')} />
        {err('email')}
      </div>
      {!compact && (
        <div>
          <label htmlFor="cf-phone" className="field-label">
            Phone
          </label>
          <input id="cf-phone" type="tel" autoComplete="tel" className="field" placeholder="+91" {...register('phone')} />
        </div>
      )}
      <div>
        <label htmlFor="cf-company" className="field-label">
          Company / Organization
        </label>
        <input id="cf-company" autoComplete="organization" className="field" placeholder="Company" {...register('company')} />
      </div>
      <div>
        <label htmlFor="cf-type" className="field-label">
          Inquiry type *
        </label>
        <select id="cf-type" className="field appearance-none bg-[length:10px] bg-[right_15px_center] bg-no-repeat pr-10" {...register('inquiryType')}
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23777'/%3E%3C/svg%3E\")" }}
        >
          {inquiryTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      {!compact && (
        <div>
          <label htmlFor="cf-subject" className="field-label">
            Subject
          </label>
          <input id="cf-subject" className="field" placeholder="What is it about?" {...register('subject')} />
        </div>
      )}
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="field-label">
          Message *
        </label>
        <textarea id="cf-message" rows={compact ? 4 : 6} className="field resize-y" placeholder="Tell us about your needs or questions..." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-error' : undefined} {...register('message')} />
        {err('message')}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 font-serif text-[0.95rem] text-body">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[rgb(var(--accent))]" aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? 'cf-privacy-error' : undefined} {...register('privacy')} />
          <span>
            I agree to the{' '}
            <Link to="/privacy-policy" className="ulink text-ink">
              privacy policy
            </Link>{' '}
            and consent to being contacted about my inquiry.
          </span>
        </label>
        {err('privacy')}
      </div>
      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 bg-ink px-7 py-[1.05rem] text-[0.95rem] font-semibold leading-none text-cream transition-colors hover:bg-ink-3 disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
          <span aria-hidden className="arw">
            →
          </span>
        </button>
        {sent && <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-quiet">Message received. We'll be in touch.</p>}
      </div>
    </form>
  );
};

export default ContactForm;
