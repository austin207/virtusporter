
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingCart, MinusCircle, PlusCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { dbService, CartItem } from "@/services/DatabaseService";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Cart = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchCartItems();
  }, [user, navigate]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const items = await dbService.getCartWithProducts(user.id);
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
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
      console.error('Error updating cart:', error);
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
      console.error('Error removing item:', error);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex flex-col items-center justify-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Start adding products to your cart to see them here</p>
                  <Button onClick={() => navigate('/employee-products')}>
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Product</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img 
                              src={item.product?.image_url || "/placeholder.svg"} 
                              alt={item.product?.name || "Product"}
                              className="w-16 h-16 object-cover rounded" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{item.product?.name || "Unknown Product"}</TableCell>
                          <TableCell>${(item.product?.price || 0).toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                disabled={updating}
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                disabled={updating}
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>${((item.product?.price || 0) * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => removeItem(item.id)}
                              disabled={updating}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-bold">Total</TableCell>
                        <TableCell className="font-bold">${calculateTotal().toFixed(2)}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="w-full md:w-auto" onClick={handleCheckout} disabled={updating}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
