
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

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
  
  const strengthInfo = {
    0: { text: "Very Weak", color: "bg-red-500" },
    1: { text: "Weak", color: "bg-red-400" },
    2: { text: "Fair", color: "bg-yellow-500" },
    3: { text: "Good", color: "bg-yellow-400" },
    4: { text: "Strong", color: "bg-green-500" },
    5: { text: "Very Strong", color: "bg-green-400" }
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
  
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs">{passwordStrength.text}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${passwordStrength.color}`}
          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
        ></div>
      </div>
      <ul className="mt-2 space-y-1 text-xs text-gray-500">
        <li className={cn(password.length >= 8 ? "text-green-500" : "")}>
          <span className="inline-flex items-center">
            {password.length >= 8 && <CheckCircle className="h-3 w-3 mr-1" />}
            At least 8 characters
          </span>
        </li>
        <li className={cn(/[A-Z]/.test(password) ? "text-green-500" : "")}>
          <span className="inline-flex items-center">
            {/[A-Z]/.test(password) && <CheckCircle className="h-3 w-3 mr-1" />}
            One uppercase letter
          </span>
        </li>
        <li className={cn(/[a-z]/.test(password) ? "text-green-500" : "")}>
          <span className="inline-flex items-center">
            {/[a-z]/.test(password) && <CheckCircle className="h-3 w-3 mr-1" />}
            One lowercase letter
          </span>
        </li>
        <li className={cn(/[0-9]/.test(password) ? "text-green-500" : "")}>
          <span className="inline-flex items-center">
            {/[0-9]/.test(password) && <CheckCircle className="h-3 w-3 mr-1" />}
            One number
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
