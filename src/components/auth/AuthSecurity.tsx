import { Shield } from "lucide-react";

const AuthSecurity = () => {
  return (
    <div className="mt-8 flex items-center gap-2 border-t border-ink/15 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-quiet">
      <Shield className="h-4 w-4" />
      <span>Your data is secure and encrypted</span>
    </div>
  );
};

export default AuthSecurity;
