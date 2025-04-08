
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

export const signInWithEmail = async (email: string, password: string) => {
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return {
    error: result.error,
    data: result.data ? { 
      session: result.data.session, 
      user: result.data.user 
    } : null
  };
};

export const signUpWithEmail = async (email: string, password: string) => {
  // Remove the redirect URL to prevent being directed to Supabase's domain
  const result = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // Custom data for the user
        company_name: 'VirtusCo',
      }
    }
  });
  
  return {
    error: result.error,
    data: result.data ? { 
      session: result.data.session, 
      user: result.data.user 
    } : null
  };
};

export const signInWithOAuthProvider = async (provider: 'google' | 'github' | 'facebook') => {
  try {
    // Remove the redirectUrl parameter to use the default URL
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        queryParams: {
          prompt: 'consent', // Force consent screen each time to ensure updated branding
        }
      }
    });
    
    if (error) {
      console.error(`Error signing in with ${provider}:`, error);
      return { error, provider };
    }
    
    return { error: null, provider };
  } catch (err) {
    console.error(`Exception during ${provider} sign in:`, err);
    return { error: err, provider };
  }
};
