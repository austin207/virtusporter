
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const CartButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [itemCount, setItemCount] = useState(0);
  
  useEffect(() => {
    if (!user) return;
    
    const fetchCartCount = async () => {
      try {
        const { data, error, count } = await supabase
          .from('cart_items')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (count !== null) {
          setItemCount(count);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    
    fetchCartCount();
    
    // Set up real-time subscription for cart changes
    const subscription = supabase
      .channel('cart_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'cart_items',
        filter: `user_id=eq.${user.id}`,
      }, fetchCartCount)
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);
  
  if (!user) return null;
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate('/cart')}
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 px-1.5 min-w-5 h-5 flex items-center justify-center rounded-full bg-virtus-primary text-white text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default CartButton;
