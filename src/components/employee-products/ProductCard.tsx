import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Product } from "@/services/types";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  cartQuantity?: number;
  onAddToCart: (productId: string) => Promise<void>;
}

const ProductCard = ({ product, isInCart, cartQuantity = 0, onAddToCart }: ProductCardProps) => {
  return (
    <article className="flex h-full flex-col bg-card">
      <div className="aspect-[4/3] overflow-hidden border-b border-ink/15 bg-paper-2">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="mono-tag text-quiet">By {product.employee_name}</span>
          <span className="mono-tag text-accent-ink">${product.price}</span>
        </div>
        <h3 className="h-card text-ink">{product.name}</h3>
        <p className="mt-3 flex-1 font-serif text-[1rem] leading-relaxed text-body">{product.description}</p>
        {product.department && (
          <p className="mono-tag mt-5 border-t border-ink/15 pt-4 text-quiet">Department: {product.department}</p>
        )}
        <Button
          variant={isInCart ? "outline" : "default"}
          className="mt-6 w-full"
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="h-4 w-4" />
          {isInCart ? `In Cart (${cartQuantity})` : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
