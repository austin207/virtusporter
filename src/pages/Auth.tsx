
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
import AuthShell from "@/components/auth/AuthShell";
import Seo from "@/seo/Seo";
import { company } from "@/content/company";

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
    <AuthShell
      eyebrow="Account"
      ink={isLogin ? "Welcome back." : "Join VirtusCo."}
      mut={company.tagline}
    >
      <Seo path="/auth" title="Sign in" description="Sign in to VirtusCo." noindex />

      <p className="eyebrow mb-4 text-quiet">{isLogin ? "Sign in" : "Sign up"}</p>
      <h2 className="h-section text-ink">
        {isLogin ? "Sign in to VirtusCo" : "Create your account"}
      </h2>
      <p className="mt-3 font-serif text-[1.02rem] text-body">
        {isLogin ? "Welcome back" : "Get started with VirtusCo"}
      </p>

      <div className="mt-10">
        {oauthError && (
          <Alert variant="destructive" className="mb-6 rounded-none border-accent/40 bg-card text-ink [&>svg]:text-accent-ink">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="eyebrow text-accent-ink">Authentication Error</AlertTitle>
            <AlertDescription className="mt-2 font-serif text-[0.95rem] text-body">{oauthError.message}</AlertDescription>
          </Alert>
        )}

        {isLogin ? (
          <LoginForm onSubmit={onLoginSubmit} loading={loading} />
        ) : (
          <SignupForm onSubmit={onSignupSubmit} loading={loading} />
        )}

        {isLogin && (
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-quiet transition-colors hover:text-accent-ink"
            >
              Forgot your password?
            </Link>
          </div>
        )}

        <div className="mt-8">
          <OAuthButtons onOAuthSignIn={handleOAuthSignIn} />

          <div className="mt-6">
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-3 border border-ink/25 px-5 py-[14px] font-mono text-[12px] uppercase leading-none tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create a new account" : "Sign in to your account"}
              <span aria-hidden className="arw">→</span>
            </button>
          </div>
        </div>

        <AuthSecurity />
      </div>
    </AuthShell>
  );
};

export default Auth;
