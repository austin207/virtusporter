
// This file is kept to maintain backward compatibility
// It re-exports all functionality from our modular services

import { 
  fetchCartItems,
  fetchCartItemCount,
  updateCartItemQuantity,
  removeCartItem,
  addToCart,
  getCartWithProducts,
} from './cartService';

import {
  fetchEmployeeProducts,
  createEmployeeProduct,
} from './productService';

import {
  fetchPressKitItems
} from './pressKitService';

// Import types
import type { CartItem, SimplifiedProduct, Product, PressKitItem } from './types';

// Re-export types using the proper "export type" syntax
export type { CartItem, SimplifiedProduct, Product, PressKitItem };

// Database service class for working with our custom tables
class DatabaseService {
  // Employee Products
  async fetchEmployeeProducts(): Promise<Product[]> {
    return fetchEmployeeProducts();
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
    return createEmployeeProduct(product);
  }
  
  // Cart operations
  async fetchCartItems(userId: string): Promise<CartItem[]> {
    return fetchCartItems(userId);
  }
  
  async fetchCartItemCount(userId: string): Promise<number> {
    return fetchCartItemCount(userId);
  }
  
  async updateCartItemQuantity(itemId: string, quantity: number): Promise<void> {
    return updateCartItemQuantity(itemId, quantity);
  }
  
  async removeCartItem(itemId: string): Promise<void> {
    return removeCartItem(itemId);
  }
  
  async addToCart(userId: string, productId: string, productType: "employee" | "company", quantity: number = 1): Promise<void> {
    return addToCart(userId, productId, productType, quantity);
  }
  
  // Get cart with products
  async getCartWithProducts(userId: string): Promise<CartItem[]> {
    return getCartWithProducts(userId);
  }
  
  // Press Kit
  async fetchPressKitItems(): Promise<PressKitItem[]> {
    return fetchPressKitItems();
  }
}

// Create and export singleton instance
export const dbService = new DatabaseService();
