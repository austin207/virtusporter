
import { createContext, startTransition, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase } from "@/integrations/supabase/lazy";
import { useToast } from "@/hooks/use-toast";

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

  // Supabase is loaded on demand: only when a saved session or an auth redirect exists, or when
  // the visitor signs in. Anonymous visitors never download the auth client.
  const connection = useRef<Promise<void> | null>(null);
  const unsubscribe = useRef<() => void>(() => {});

  const connect = useCallback(() => {
    if (connection.current) return connection.current;
    connection.current = getSupabase()
      .then((supabase) => {
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
        });
        unsubscribe.current = () => subscription.unsubscribe();

        // THEN check for existing session
        return supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        });
      })
      .catch(() => setLoading(false));
    return connection.current;
  }, [toast]);

  useEffect(() => {
    let hasStoredSession = false;
    try {
      hasStoredSession = Object.keys(localStorage).some((k) => k.startsWith('sb-') && k.endsWith('-auth-token'));
    } catch {
      /* storage blocked */
    }
    const hasAuthRedirect = /access_token|refresh_token|[?&]code=|error_description|type=recovery/.test(window.location.hash + window.location.search);
    if (hasStoredSession || hasAuthRedirect) connect();
    else startTransition(() => setLoading(false)); // non-urgent: never interrupts route hydration

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

    return () => {
      unsubscribe.current();
      unsubscribe.current = () => {};
      connection.current = null; // allow a clean reconnect (StrictMode remount)
    };
  }, [toast, connect]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    void connect();
    const { signInWithEmail } = await import("@/services/authService");
    const result = await signInWithEmail(email, password);
    setLoading(false);
    return result;
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    void connect();
    const { signUpWithEmail } = await import("@/services/authService");
    const result = await signUpWithEmail(email, password);
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    await (await getSupabase()).auth.signOut();
    setLoading(false);
  };

  // OAuth sign in
  const signInWithOAuth = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(true);
      void connect();
      const { signInWithOAuthProvider } = await import("@/services/authService");
      const result = await signInWithOAuthProvider(provider);
      
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
