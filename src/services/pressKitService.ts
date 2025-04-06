
import { supabase } from "@/integrations/supabase/client";
import { PressKitItem } from "./types";

// Press Kit
export async function fetchPressKitItems(): Promise<PressKitItem[]> {
  const { data, error } = await supabase
    .from('press_kit')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching press kit items:', error);
    throw error;
  }
  
  return data || [];
}

