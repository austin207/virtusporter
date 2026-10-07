import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import Seo from "@/seo/Seo";
import { Eyebrow, OxLink, Section } from "@/components/ox/primitives";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { dbService, CartItem } from "@/services/DatabaseService";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Cart = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Wait for the session to be restored before deciding the user is logged out
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchCartItems();
  }, [user, authLoading, navigate]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const items = await dbService.getCartWithProducts(user.id);
      setCartItems(items);
    } catch (error) {
      console.warn('Error fetching cart items:', error);
      toast({
        title: "Failed to load cart",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: string, newQuantity: number) => {
    if (!user || updating) return;
    
    try {
      setUpdating(true);
      
      if (newQuantity <= 0) {
        // Remove item
        await removeItem(itemId);
      } else {
        // Update quantity
        await dbService.updateCartItemQuantity(itemId, newQuantity);
        
        // Update local state
        setCartItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
        
        toast({
          title: "Cart updated",
          description: "Item quantity has been updated.",
        });
      }
    } catch (error) {
      console.warn('Error updating cart:', error);
      toast({
        title: "Failed to update cart",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!user || updating) return;
    
    try {
      setUpdating(true);
      
      await dbService.removeCartItem(itemId);
      
      // Remove from local state
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.warn('Error removing item:', error);
      toast({
        title: "Failed to remove item",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + ((item.product?.price || 0) * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout not implemented",
      description: "This is a demo feature. Checkout functionality would be implemented here.",
    });
  };

  return (
    <>
      <Seo
        path="/cart"
        title="Your Cart"
        description="Review the products in your VirtusCo cart."
        noindex
      />

      <section data-tone="dark" data-rail="Cart" className="on-dark bg-ink text-light">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 pb-12 pt-40">
          <div>
            <Eyebrow dot className="mb-5 text-light/70">Marketplace</Eyebrow>
            <h1 className="h-page text-light">Your Cart</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 border border-light/30 px-5 py-[13px] font-mono text-[12.5px] uppercase leading-none tracking-[0.08em] text-light transition-colors hover:bg-light hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </button>
        </div>
      </section>

      <Section label="Items" className="sec-sm wrap">
        {loading ? (
          <div className="flex items-center gap-4 py-16" role="status">
            <span aria-hidden className="h-[7px] w-[7px] animate-pulse bg-accent" />
            <span className="eyebrow text-quiet">Loading cart</span>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="border-y border-ink/15 py-16">
            <h2 className="h-section text-ink">Your cart is empty</h2>
            <p className="lede mt-4 text-body">Start adding products to your cart to see them here</p>
            <div className="mt-8">
              <OxLink to="/employee-products" variant="solid">
                Browse Products
              </OxLink>
            </div>
          </div>
        ) : (
          <div className="bg-card">
            <div className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
              <h2 className="h-card text-ink">Cart Items ({cartItems.length})</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-ink/15 hover:bg-transparent">
                  <TableHead className="eyebrow h-12 w-[120px] px-6 text-quiet">Product</TableHead>
                  <TableHead className="eyebrow h-12 text-quiet">Name</TableHead>
                  <TableHead className="eyebrow h-12 text-quiet">Price</TableHead>
                  <TableHead className="eyebrow h-12 text-quiet">Quantity</TableHead>
                  <TableHead className="eyebrow h-12 text-quiet">Total</TableHead>
                  <TableHead className="eyebrow h-12 w-[100px] px-6 text-quiet">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id} className="border-ink/15 hover:bg-paper/60">
                    <TableCell className="px-6">
                      <img
                        src={item.product?.image_url || "/placeholder.svg"}
                        alt={item.product?.name || "Product"}
                        className="h-16 w-16 border border-ink/15 bg-paper-2 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-sans text-[0.98rem] font-medium text-ink">{item.product?.name || "Unknown Product"}</TableCell>
                    <TableCell className="font-mono text-[13px] text-body">${(item.product?.price || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="inline-flex items-center border border-ink/20">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={updating}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-mono text-[13px]">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          disabled={updating}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[13px] text-ink">${((item.product?.price || 0) * item.quantity).toFixed(2)}</TableCell>
                    <TableCell className="px-6">
                      <button
                        type="button"
                        aria-label="Remove item"
                        className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground disabled:opacity-40"
                        onClick={() => removeItem(item.id)}
                        disabled={updating}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-t border-ink/15 bg-transparent">
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={4} className="eyebrow text-right text-quiet">Total</TableCell>
                  <TableCell className="font-sans text-[1.1rem] font-semibold text-ink">${calculateTotal().toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="flex justify-end border-t border-ink/15 p-6">
              <Button size="lg" className="w-full md:w-auto" onClick={handleCheckout} disabled={updating}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
};

export default Cart;
