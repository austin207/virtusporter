
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmail, signUpWithEmail, signInWithOAuthProvider } from "@/services/authService";

// Base site URL for redirects
const BASE_URL = 'https://virtusco.in';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{
    error: any;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: any;
    data: { session: Session | null; user: User | null } | null;
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
  
  // OAuth support
  signInWithOAuth: (provider: 'google' | 'github' | 'facebook') => Promise<{
    error: any;
    provider: 'google' | 'github' | 'facebook';
  } | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Show toast on successful sign in
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
          });
        }
      }
    );

    // Check for URL error parameters that might indicate OAuth issues
    const url = new URL(window.location.href);
    const errorDescription = url.searchParams.get('error_description');
    if (errorDescription) {
      console.error("OAuth Error:", errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription,
        variant: "destructive",
      });
      
      // Remove error parameters from URL to prevent showing the error again on refresh
      url.searchParams.delete('error_description');
      url.searchParams.delete('error');
      window.history.replaceState({}, document.title, url.toString());
    }

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await signInWithEmail(email, password);
    setLoading(false);
    return result;
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const result = await signUpWithEmail(email, password, BASE_URL);
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  // OAuth sign in
  const signInWithOAuth = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(true);
      const result = await signInWithOAuthProvider(provider, BASE_URL);
      
      // If there's no error, the user is being redirected to OAuth provider
      if (!result.error) {
        toast({
          title: "Redirecting...",
          description: `Connecting to ${provider}. You'll be redirected.`,
        });
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signIn, 
      signUp, 
      signOut, 
      loading, 
      signInWithOAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
