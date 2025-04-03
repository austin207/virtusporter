
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oauthError, setOauthError] = useState<{message: string, provider: string} | null>(null);
  const { signIn, signUp, signInWithOAuth, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  const onSubmit = async (data: AuthFormValues) => {
    try {
      const result = isLogin
        ? await signIn(data.email, data.password)
        : await signUp(data.email, data.password);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin
            ? "You've successfully logged in."
            : "Please check your email for verification instructions.",
        });
        
        if (result.data?.session || (!isLogin && !result.error)) {
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
      // Redirect will happen automatically
    } catch (error) {
      toast({
        title: "Authentication error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  // Provider setup instructions
  const getProviderInstructions = (provider: string) => {
    if (provider === 'google') {
      return (
        <>
          <p className="mb-2">To fix Google OAuth issues:</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Go to the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-red-500 underline">Google Cloud Console</a></li>
            <li>Ensure your OAuth consent screen has the correct authorized domains</li>
            <li>Verify your OAuth credentials include the proper redirect URI: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{window.location.origin}/auth/callback</code></li>
            <li>Add an additional redirect URI: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{window.location.origin}</code></li>
            <li>Make sure <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{window.location.origin}</code> is in the authorized JavaScript origins</li>
            <li>Check that your Supabase project has the correct Google client ID and secret</li>
            <li>In Supabase, verify Site URL is set to <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{window.location.origin}</code></li>
          </ol>
        </>
      );
    }
    return null;
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
              <AlertDescription className="mt-2">
                {oauthError.message}
                {getProviderInstructions(oauthError.provider)}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  type="submit"
                  className={cn("w-full bg-red-500 hover:bg-red-600")}
                  isLoading={loading}
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
              </button>
              <button
                type="button"
                onClick={() => handleOAuthSignIn('github')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGithub className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => handleOAuthSignIn('facebook')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaFacebook className="h-5 w-5 text-blue-600" />
              </button>
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default Auth;
