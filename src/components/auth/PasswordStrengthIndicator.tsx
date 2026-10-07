import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type PasswordStrengthProps = {
  password: string;
};

export const getPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, text: "", color: "" };

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Token colours only: weak = accent, fair = ink at half strength, strong = solid ink.
  const strengthInfo = {
    0: { text: "Very Weak", color: "bg-accent" },
    1: { text: "Weak", color: "bg-accent" },
    2: { text: "Fair", color: "bg-ink/50" },
    3: { text: "Good", color: "bg-ink/70" },
    4: { text: "Strong", color: "bg-ink" },
    5: { text: "Very Strong", color: "bg-ink" }
  };

  return {
    strength,
    text: strengthInfo[strength as keyof typeof strengthInfo].text,
    color: strengthInfo[strength as keyof typeof strengthInfo].color
  };
};

const PasswordStrengthIndicator = ({ password }: PasswordStrengthProps) => {
  const passwordStrength = getPasswordStrength(password);

  if (!password) return null;

  const rules = [
    { ok: password.length >= 8, label: "At least 8 characters" },
    { ok: /[A-Z]/.test(password), label: "One uppercase letter" },
    { ok: /[a-z]/.test(password), label: "One lowercase letter" },
    { ok: /[0-9]/.test(password), label: "One number" },
  ];

  return (
    <div className="mt-3">
      <div className="mb-2 flex justify-between">
        <span className="mono-tag text-quiet">{passwordStrength.text}</span>
      </div>
      <div className="h-[3px] w-full bg-ink/10">
        <div
          className={cn("h-full transition-all duration-300", passwordStrength.color)}
          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
        ></div>
      </div>
      <ul className="mt-3 grid grid-cols-1 gap-1.5 font-mono text-[11px] tracking-wide sm:grid-cols-2">
        {rules.map((r) => (
          <li key={r.label} className={cn("inline-flex items-center gap-1.5", r.ok ? "text-ink" : "text-quiet")}>
            <Check className={cn("h-3 w-3", r.ok ? "opacity-100" : "opacity-0")} />
            {r.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
