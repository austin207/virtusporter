
import { supabase } from "@/integrations/supabase/client";
import { Product } from "./types";

// Employee Products
export async function fetchEmployeeProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('employee_products')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching employee products:', error);
    throw error;
  }
  
  return data || [];
}

export async function createEmployeeProduct(product: {
  name: string;
  description: string;
  price: number;
  image_url: string;
  employee_id?: string;
  employee_name: string;
  department?: string | null;
}): Promise<Product> {
  const { data, error } = await supabase
    .from('employee_products')
    .insert(product)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating employee product:', error);
    throw error;
  }
  
  return data as Product;
}

