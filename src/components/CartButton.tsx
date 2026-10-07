
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const CartButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [itemCount, setItemCount] = useState(0);
  
  useEffect(() => {
    if (!user) return;
    
    let cancelled = false;
    let unsubscribe = () => {};
    const fetchCartCount = async () => {
      try {
        const { dbService } = await import("@/services/DatabaseService");
        const count = await dbService.fetchCartItemCount(user.id);
        setItemCount(count);
      } catch (error) {
        console.warn('Error fetching cart count:', error);
      }
    };
    
    fetchCartCount();
    
    // Set up real-time subscription for cart changes (Supabase is loaded on demand)
    import("@/integrations/supabase/lazy")
      .then(({ getSupabase }) => getSupabase())
      .then((supabase) => {
        if (cancelled) return;
        const subscription = supabase
          .channel('cart_changes')
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'cart_items',
            filter: `user_id=eq.${user.id}`,
          }, fetchCartCount)
          .subscribe();
        unsubscribe = () => subscription.unsubscribe();
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [user]);
  
  if (!user) return null;

  return (
    <button
      type="button"
      onClick={() => navigate('/cart')}
      aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
      className="relative inline-flex h-9 items-center gap-2 border border-current px-3 opacity-80 hover:opacity-100 font-mono text-[11.5px] uppercase tracking-[0.08em] transition-opacity"
    >
      <ShoppingCart className="h-4 w-4" aria-hidden />
      <span>{itemCount}</span>
    </button>
  );
};

export default CartButton;
