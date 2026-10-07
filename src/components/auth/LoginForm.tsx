import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import PasswordInput from "./PasswordInput";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  loading: boolean;
};

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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
              <FormMessage className="mt-1.5 font-mono text-[11px] font-normal tracking-wide text-accent-ink" />
            </FormItem>
          )}
        />

        <PasswordInput name="password" label="Password" />

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full" isLoading={loading}>
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
