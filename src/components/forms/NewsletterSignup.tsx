
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/Button';

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
      console.error('Error subscribing to newsletter:', error);
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Stay Updated</CardTitle>
        <CardDescription>
          Subscribe to our newsletter for the latest news and updates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field} 
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        isLoading={isSubmitting}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
