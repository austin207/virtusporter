
import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-gray-50 border-gray-300 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
          {showStrengthIndicator && <PasswordStrengthIndicator password={passwordValue} />}
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
