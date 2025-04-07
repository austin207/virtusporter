
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/services/types";

interface ProductGridProps {
  products: Product[];
  cartItems: { id: string; quantity: number }[];
  onAddToCart: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const ProductGrid = ({ products, cartItems, onAddToCart, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No products available yet. Be the first to submit your innovation!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product) => {
        const cartItem = cartItems.find(item => item.id === product.id);
        const isInCart = Boolean(cartItem);
        const cartQuantity = cartItem?.quantity;
        
        return (
          <ProductCard 
            key={product.id}
            product={product}
            isInCart={isInCart}
            cartQuantity={cartQuantity}
            onAddToCart={onAddToCart}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
