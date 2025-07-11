
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
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

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <div className="flex flex-col items-center">
          <Button 
            onClick={handleSignOut} 
            variant="ghost"
            className="rounded-full p-2 h-auto"
          >
            <User className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 font-medium">Sign out</span>
        </div>
      ) : (
        <NavLink to="/auth" className="flex flex-col items-center">
          <Button variant="ghost" className="rounded-full p-2 h-auto">
            <User className="h-6 w-6" />
          </Button>
          <span className="text-xs mt-1 font-medium">Sign in</span>
        </NavLink>
      )}
    </div>
  );
};

export default AuthButtons;
