
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Button from "@/components/ui/Button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Shield, LockKeyhole, CheckCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and privacy policy" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oauthError, setOauthError] = useState<{message: string, provider: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp, signInWithOAuth, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
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

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
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
  
  const passwordValue = signupForm.watch("password");
  const passwordStrength = getPasswordStrength(passwordValue);

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
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="bg-gray-50 border-gray-300 focus:ring-red-500 focus:border-red-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    type="submit"
                    className={cn("w-full bg-red-500 hover:bg-red-600")}
                    isLoading={loading}
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="bg-gray-50 border-gray-300 focus:ring-red-500 focus:border-red-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                      {passwordValue && (
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
                            <li className={cn(passwordValue.length >= 8 ? "text-green-500" : "")}>
                              <span className="inline-flex items-center">
                                {passwordValue.length >= 8 && <CheckCircle className="h-3 w-3 mr-1" />}
                                At least 8 characters
                              </span>
                            </li>
                            <li className={cn(/[A-Z]/.test(passwordValue) ? "text-green-500" : "")}>
                              <span className="inline-flex items-center">
                                {/[A-Z]/.test(passwordValue) && <CheckCircle className="h-3 w-3 mr-1" />}
                                One uppercase letter
                              </span>
                            </li>
                            <li className={cn(/[a-z]/.test(passwordValue) ? "text-green-500" : "")}>
                              <span className="inline-flex items-center">
                                {/[a-z]/.test(passwordValue) && <CheckCircle className="h-3 w-3 mr-1" />}
                                One lowercase letter
                              </span>
                            </li>
                            <li className={cn(/[0-9]/.test(passwordValue) ? "text-green-500" : "")}>
                              <span className="inline-flex items-center">
                                {/[0-9]/.test(passwordValue) && <CheckCircle className="h-3 w-3 mr-1" />}
                                One number
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-gray-50 border-gray-300 focus:ring-red-500 focus:border-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I accept the <Link to="/terms-of-service" className="text-red-500 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-red-500 hover:underline">Privacy Policy</Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div>
                  <Button
                    type="submit"
                    className={cn("w-full bg-red-500 hover:bg-red-600")}
                    isLoading={loading}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Form>
          )}

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
          
          {isLogin && (
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-red-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}
          
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center text-sm text-gray-500">
              <Shield className="h-4 w-4 text-red-500 mr-2" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
