
// Type definitions for our custom tables
export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  product_type: "employee" | "company"; // Strict union type
  quantity: number;
  created_at: string;
  product?: Product | SimplifiedProduct; // Allow for simplified product type
}

// Define a simplified product type for when we only need basic product info
export interface SimplifiedProduct {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  employee_id?: string; // Optional field for employee products
  employee_name?: string; // Optional to match database schema
  department?: string | null;
  created_at: string;
  active?: boolean;
}

export interface PressKitItem {
  id: string;
  title: string;
  description: string;
  file_url: string;
  thumbnail_url: string | null;
  file_type: string;
  category: string;
  created_at: string;
  updated_at: string;
}

