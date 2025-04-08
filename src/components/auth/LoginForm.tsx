
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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

        <PasswordInput name="password" label="Password" />

        <div>
          <Button
            type="submit"
            className={cn("w-full bg-red-500 hover:bg-red-600")}
            isLoading={loading}
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
