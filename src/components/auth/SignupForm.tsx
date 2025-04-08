
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordInput from "./PasswordInput";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and privacy policy" }),
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

const SignupForm = ({ onSubmit, loading }: SignupFormProps) => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-50 border-gray-300 focus:ring-red-500 focus:border-red-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordInput name="password" label="Password" showStrengthIndicator={true} />
        <PasswordInput name="confirmPassword" label="Confirm Password" />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal">
                  I accept the <Link to="/terms-of-service" className="text-red-500 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-red-500 hover:underline">Privacy Policy</Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div>
          <Button
            type="submit"
            className={cn("w-full bg-red-500 hover:bg-red-600")}
            isLoading={loading}
          >
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
