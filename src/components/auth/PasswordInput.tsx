import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext } from "react-hook-form";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

type PasswordInputProps = {
  name: "password" | "confirmPassword";
  label: string;
  showStrengthIndicator?: boolean;
};

const PasswordInput = ({
  name,
  label,
  showStrengthIndicator = false
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useFormContext();
  const passwordValue = form.watch(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className="field-label">{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="field pr-12"
              />
            </FormControl>
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-quiet transition-colors hover:text-ink"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <FormMessage className="mt-1.5 font-mono text-[11px] font-normal tracking-wide text-accent-ink" />
          {showStrengthIndicator && <PasswordStrengthIndicator password={passwordValue} />}
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
