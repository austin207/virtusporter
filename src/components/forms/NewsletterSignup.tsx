
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSupabase } from '@/integrations/supabase/lazy';
import { useToast } from '@/hooks/use-toast';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const NewsletterSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ''
    }
  });
  
  const onSubmit = async (values: NewsletterFormValues) => {
    setIsSubmitting(true);
    
    try {
      const supabase = await getSupabase();
      const { error } = await supabase
        .from('subscribers')
        .insert({ email: values.email });
        
      if (error) {
        if (error.code === '23505') { // Unique violation error code
          toast({
            title: 'Already subscribed',
            description: 'This email is already subscribed to our newsletter.',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Subscription successful!',
          description: 'Thank you for subscribing to our newsletter.',
        });
        form.reset();
      }
    } catch (error) {
      console.warn('Error subscribing to newsletter:', error);
      toast({
        title: 'Subscription failed',
        description: 'Unable to subscribe. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="w-full max-w-sm">
      <label htmlFor="nl-email" className="eyebrow mb-3 block text-quiet">
        Stay updated
      </label>
      <div className="flex border border-light/25 focus-within:border-accent focus-within:shadow-[0_0_0_2px_rgb(var(--accent))]">
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={form.formState.errors.email ? 'nl-email-error' : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 font-sans text-[0.92rem] text-light placeholder:text-quiet focus:outline-none"
          {...form.register('email')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="group shrink-0 border-l border-light/25 px-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-light transition-colors hover:bg-light hover:text-ink disabled:opacity-60"
        >
          {isSubmitting ? '…' : 'Subscribe'}
        </button>
      </div>
      {form.formState.errors.email && (
        <p id="nl-email-error" role="alert" className="mt-2 font-mono text-[11px] text-accent-ink">
          {form.formState.errors.email.message}
        </p>
      )}
      <p className="mt-2 font-serif text-[0.82rem] text-quiet">
        By subscribing you agree to our{' '}
        <a href="/privacy-policy" className="ulink text-soft">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
};

export default NewsletterSignup;
