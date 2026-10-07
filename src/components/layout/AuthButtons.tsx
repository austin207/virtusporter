
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut } from "lucide-react";

const AuthButtons = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  const cls =
    'inline-flex h-9 items-center gap-2 px-1 font-mono text-[11.5px] uppercase tracking-[0.08em] opacity-80 transition-opacity hover:opacity-100';

  return user ? (
    <button type="button" onClick={handleSignOut} className={cls}>
      <LogOut className="h-4 w-4" aria-hidden />
      Sign out
    </button>
  ) : (
    <NavLink to="/auth" className={cls}>
      <User className="h-4 w-4" aria-hidden />
      Sign in
    </NavLink>
  );
};

export default AuthButtons;
