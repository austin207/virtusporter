import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/ui/Button";
import AuthShell from "@/components/auth/AuthShell";
import Seo from "@/seo/Seo";

const forgotSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
});

type ForgotValues = z.infer<typeof forgotSchema>;

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { message: "Passwords don't match", path: ["confirm"] });

type NewPasswordValues = z.infer<typeof newPasswordSchema>;

/** Shown when the user lands here from the reset email (?reset=1) with a recovery session. */
const SetNewPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordValues>({ resolver: zodResolver(newPasswordSchema), defaultValues: { password: "", confirm: "" } });

  const onSubmit = async ({ password }: NewPasswordValues) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: "Couldn't update password", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated", description: "You're signed in with your new password." });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-5">
      <div>
        <label htmlFor="np-password" className="field-label">
          New password
        </label>
        <input id="np-password" type="password" autoComplete="new-password" className="field" {...register("password")} />
        {errors.password && <p role="alert" className="mt-1.5 font-mono text-[11px] tracking-wide text-accent-ink">{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="np-confirm" className="field-label">
          Confirm new password
        </label>
        <input id="np-confirm" type="password" autoComplete="new-password" className="field" {...register("confirm")} />
        {errors.confirm && <p role="alert" className="mt-1.5 font-mono text-[11px] tracking-wide text-accent-ink">{errors.confirm.message}</p>}
      </div>
      <div className="pt-2">
        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
          Save new password
        </Button>
      </div>
    </form>
  );
};

const ForgotPassword = () => {
  const { toast } = useToast();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [params] = useSearchParams();
  const { user, loading } = useAuth();
  const resetMode = params.get("reset") === "1";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async ({ email }: ForgotValues) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/forgot-password?reset=1`,
      });
      if (error) throw error;
      setSentTo(email);
    } catch (error) {
      toast({
        title: "Couldn't send reset link",
        description: (error as Error).message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthShell eyebrow="Account" ink="Forgot your password?" mut="We'll send you a link.">
      <Seo
        path="/forgot-password"
        title="Reset password"
        description="Request a password reset link for your VirtusCo account."
        noindex
      />

      <p className="eyebrow mb-4 text-quiet">Password reset</p>
      <h2 className="h-section text-ink">{resetMode && user ? "Choose a new password" : "Reset your password"}</h2>

      {resetMode && loading ? (
        <p role="status" className="mt-10 font-mono text-[11.5px] uppercase tracking-[0.14em] text-quiet">
          Verifying your reset link…
        </p>
      ) : resetMode && user ? (
        <SetNewPassword />
      ) : sentTo ? (
        <div role="status" className="mt-10 border-l-2 border-accent bg-card p-6">
          <p className="eyebrow mb-3 text-accent-ink">Email sent</p>
          <p className="font-serif text-[1.05rem] leading-relaxed text-ink">Check your email for a reset link</p>
          <p className="mt-2 font-serif text-[0.95rem] text-body">
            We sent it to <span className="text-ink">{sentTo}</span>. The link signs you back in so you can choose a new password.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-3 font-serif text-[1.02rem] text-body">
            Enter the email address on your account and we'll email you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-5">
            <div>
              <label htmlFor="fp-email" className="field-label">
                Email
              </label>
              <input
                id="fp-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="field"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className="mt-1.5 font-mono text-[11px] tracking-wide text-accent-ink">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
                Send reset link
              </Button>
            </div>
          </form>
        </>
      )}

      <div className="mt-8 border-t border-ink/15 pt-6">
        <Link
          to="/auth"
          className="group inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent-ink"
        >
          <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
};

export default ForgotPassword;
