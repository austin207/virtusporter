
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

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
  
  // Improved OAuth support with better error handling
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

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    return {
      error: result.error,
      data: result.data ? { 
        session: result.data.session, 
        user: result.data.user 
      } : null
    };
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const result = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    return {
      error: result.error,
      data: result.data ? { 
        session: result.data.session, 
        user: result.data.user 
      } : null
    };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  // Improved OAuth sign in with better error handling
  const signInWithOAuth = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            // Add additional parameters if needed
            // access_type: 'offline', // For Google refresh tokens
            // prompt: 'consent', // Force consent screen
          }
        }
      });
      
      if (error) {
        console.error(`Error signing in with ${provider}:`, error);
        return { error, provider };
      }
      
      // If there's no error, the user is being redirected to OAuth provider
      // We don't need to return anything as the page will reload
      
    } catch (err) {
      console.error(`Exception during ${provider} sign in:`, err);
      return { error: err, provider };
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
