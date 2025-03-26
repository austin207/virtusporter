
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

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
        <Button 
          onClick={handleSignOut} 
          variant="outline"
          className="bg-white hover:bg-gray-50"
        >
          Sign out
        </Button>
      ) : (
        <NavLink to="/auth">
          <Button variant="primary">
            Sign in
          </Button>
        </NavLink>
      )}
    </div>
  );
};

export default AuthButtons;
