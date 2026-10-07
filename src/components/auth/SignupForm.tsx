import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordInput from "./PasswordInput";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;

type SignupFormProps = {
  onSubmit: (data: SignupFormValues) => Promise<void>;
  loading: boolean;
};

const errorText = "mt-1.5 font-mono text-[11px] font-normal tracking-wide text-accent-ink";

const SignupForm = ({ onSubmit, loading }: SignupFormProps) => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false, // This is allowed with our updated schema
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="field-label">Email</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="field"
                />
              </FormControl>
              <FormMessage className={errorText} />
            </FormItem>
          )}
        />

        <PasswordInput name="password" label="Password" showStrengthIndicator={true} />
        <PasswordInput name="confirmPassword" label="Confirm Password" />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0 py-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5 rounded-none border-ink/40 data-[state=checked]:border-ink data-[state=checked]:bg-ink data-[state=checked]:text-paper"
                />
              </FormControl>
              <div className="space-y-1 leading-snug">
                <FormLabel className="font-serif text-[0.95rem] font-normal text-body">
                  I accept the <Link to="/terms-of-service" className="ulink text-ink">Terms of Service</Link> and <Link to="/privacy-policy" className="ulink text-ink">Privacy Policy</Link>
                </FormLabel>
                <FormMessage className={errorText} />
              </div>
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full" isLoading={loading}>
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
