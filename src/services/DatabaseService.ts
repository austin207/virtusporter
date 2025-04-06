
import { supabase } from "@/integrations/supabase/client";

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

// Database service class for working with our custom tables
class DatabaseService {
  // Employee Products
  async fetchEmployeeProducts(): Promise<Product[]> {
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
  
  async createEmployeeProduct(product: {
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
  
  // Cart operations
  async fetchCartItems(userId: string): Promise<CartItem[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
    
    // Ensure product_type is of the correct type
    return (data || []).map(item => ({
      ...item,
      product_type: item.product_type as "employee" | "company"
    }));
  }
  
  async fetchCartItemCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching cart count:', error);
      throw error;
    }
    
    return count || 0;
  }
  
  async updateCartItemQuantity(itemId: string, quantity: number): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);
      
    if (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  }
  
  async removeCartItem(itemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
      
    if (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  }
  
  async addToCart(userId: string, productId: string, productType: "employee" | "company", quantity: number = 1): Promise<void> {
    // Check if the item is already in cart
    const { data: existingItems, error: fetchError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId);
      
    if (fetchError) {
      console.error('Error checking cart:', fetchError);
      throw fetchError;
    }
    
    if (existingItems && existingItems.length > 0) {
      // Update existing item
      const existingItem = existingItems[0];
      const newQuantity = existingItem.quantity + quantity;
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id);
        
      if (error) {
        console.error('Error updating cart item:', error);
        throw error;
      }
    } else {
      // Add new item
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          product_type: productType,
          quantity
        });
        
      if (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    }
  }
  
  // Get cart with products
  async getCartWithProducts(userId: string): Promise<CartItem[]> {
    // Fetch cart items
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);
      
    if (cartError) {
      console.error('Error fetching cart:', cartError);
      throw cartError;
    }
    
    if (!cartItems || cartItems.length === 0) {
      return [];
    }
    
    // Ensure product_type is the correct type and cast it
    const typedCartItems = cartItems.map(item => ({
      ...item,
      product_type: item.product_type as "employee" | "company"
    }));
    
    // Separate by product type
    const employeeItems = typedCartItems.filter(item => item.product_type === 'employee');
    const companyItems = typedCartItems.filter(item => item.product_type === 'company');
    
    // Fetch products
    let employeeProductData: Product[] = [];
    let companyProductData: Product[] = [];
    
    if (employeeItems.length > 0) {
      const { data, error } = await supabase
        .from('employee_products')
        .select('id, name, price, image_url, description, created_at')
        .in('id', employeeItems.map(item => item.product_id));
      
      if (error) throw error;
      employeeProductData = data as Product[] || [];
    }
    
    if (companyItems.length > 0) {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, description, created_at')
        .in('id', companyItems.map(item => item.product_id));
      
      if (error) throw error;
      companyProductData = data as Product[] || [];
    }
    
    // Combine all products
    const allProducts = [
      ...employeeProductData,
      ...companyProductData
    ];
    
    // Map products to cart items
    const cartWithProducts = typedCartItems.map(item => {
      const product = allProducts.find(p => p.id === item.product_id);
      
      return {
        ...item,
        product: product || {
          id: item.product_id,
          name: "Product Not Found",
          price: 0,
          image_url: "/placeholder.svg",
          description: "",
          created_at: new Date().toISOString()
        }
      };
    });
    
    return cartWithProducts;
  }
  
  // Press Kit
  async fetchPressKitItems(): Promise<PressKitItem[]> {
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
}

// Create and export singleton instance
export const dbService = new DatabaseService();
