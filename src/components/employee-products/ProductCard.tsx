
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/services/types";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  cartQuantity?: number;
  onAddToCart: (productId: string) => Promise<void>;
}

const ProductCard = ({ product, isInCart, cartQuantity = 0, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="flex flex-col h-full card-animate">
      <CardHeader>
        <img 
          src={product.image_url || "/placeholder.svg"} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded-md mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className="flex justify-between">
          <span>By {product.employee_name}</span>
          <span className="text-virtus-primary">${product.price}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{product.description}</p>
        {product.department && (
          <p className="text-sm text-gray-500 mt-2">Department: {product.department}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> 
          {isInCart ? `In Cart (${cartQuantity})` : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
