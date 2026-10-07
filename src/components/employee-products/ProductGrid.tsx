import ProductCard from "./ProductCard";
import { Product } from "@/services/types";

interface ProductGridProps {
  products: Product[];
  cartItems: { id: string; quantity: number }[];
  onAddToCart: (productId: string) => Promise<void>;
  isLoading: boolean;
  loadFailed?: boolean;
}

const ProductGrid = ({ products, cartItems, onAddToCart, isLoading, loadFailed }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-4 py-16" role="status">
        <span aria-hidden className="h-[7px] w-[7px] animate-pulse bg-accent" />
        <span className="eyebrow text-quiet">Loading products</span>
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div role="alert" className="border-y border-ink/15 py-16">
        <p className="eyebrow mb-3 text-accent-ink">Marketplace unavailable</p>
        <p className="lede text-body">
          We couldn't reach the marketplace right now. Please try again later, or{' '}
          <a href="/contact" className="ulink text-ink">
            contact us
          </a>
          .
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border-y border-ink/15 py-16">
        <p className="lede text-body">No products available yet. Be the first to submit your innovation!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
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
