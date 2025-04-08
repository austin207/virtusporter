
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import LoginForm, { LoginFormValues } from "@/components/auth/LoginForm";
import SignupForm, { SignupFormValues } from "@/components/auth/SignupForm";
import OAuthButtons from "@/components/auth/OAuthButtons";
import AuthSecurity from "@/components/auth/AuthSecurity";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oauthError, setOauthError] = useState<{message: string, provider: string} | null>(null);
  const { signIn, signUp, signInWithOAuth, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Check for error parameters in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const errorDesc = searchParams.get('error_description');
    const errorProvider = searchParams.get('provider') || 'oauth';
    
    if (errorDesc) {
      setOauthError({
        message: errorDesc,
        provider: errorProvider
      });
      
      // Clean URL parameters
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn(data.email, data.password);

      if (result.error) {
        toast({
          title: "Login failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        
        if (result.data?.session) {
          // Ensure we stay on our app by explicitly navigating to home
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    try {
      const result = await signUp(data.email, data.password);

      if (result.error) {
        toast({
          title: "Sign up failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email for verification instructions.",
        });
        
        if (result.data?.session) {
          // Ensure we stay on our app by explicitly navigating to home
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'facebook') => {
    setOauthError(null);
    try {
      await signInWithOAuth(provider);
      // Redirect will happen automatically via OAuth flow
    } catch (error) {
      toast({
        title: "Authentication error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <span className="text-red-500">Virtus</span>Co
        </h2>
        <h3 className="mt-2 text-center text-2xl font-bold text-gray-900">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {oauthError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{oauthError.message}</AlertDescription>
            </Alert>
          )}

          {isLogin ? (
            <LoginForm onSubmit={onLoginSubmit} loading={loading} />
          ) : (
            <SignupForm onSubmit={onSignupSubmit} loading={loading} />
          )}

          <div className="mt-6">
            <OAuthButtons onOAuthSignIn={handleOAuthSignIn} />

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create a new account" : "Sign in to your account"}
              </button>
            </div>
          </div>
          
          {isLogin && (
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-red-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}
          
          <AuthSecurity />
        </div>
      </div>
    </div>
  );
};

export default Auth;
