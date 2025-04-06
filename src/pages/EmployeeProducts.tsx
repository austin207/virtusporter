
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import EmployeeProductForm from "@/components/forms/EmployeeProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { dbService, Product } from "@/services/DatabaseService";
import { supabase } from "@/integrations/supabase/client";

const EmployeeProducts = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<{id: string, quantity: number}[]>([]);
  
  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await dbService.fetchEmployeeProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Failed to load products",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);
  
  // Fetch user's cart if logged in
  useEffect(() => {
    if (!user) return;
    
    const fetchCartItems = async () => {
      try {
        const cartItems = await dbService.fetchCartItems(user.id);
        setCartItems(cartItems.map(item => ({
          id: item.product_id,
          quantity: item.quantity
        })));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    
    fetchCartItems();
  }, [user]);

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add products to your cart.",
      });
      return;
    }
    
    try {
      await dbService.addToCart(user.id, productId, 'employee', 1);
      
      // Update local state
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        setCartItems(prev => prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCartItems(prev => [...prev, { id: productId, quantity: 1 }]);
      }
      
      toast({
        title: "Added to cart",
        description: "This product has been added to your cart.",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Failed to add to cart",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNewProduct = async (productData: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be signed in to submit products.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const newProduct = await dbService.createEmployeeProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image_url: productData.image,
        employee_id: user.id,
        employee_name: user?.email?.split('@')[0] || 'Anonymous Employee',
        department: 'Not Specified'
      });
      
      // Add new product to state
      setProducts(prevProducts => [newProduct, ...prevProducts]);
      
      setOpen(false);
      
      toast({
        title: "Product submitted",
        description: "Your product has been added to the marketplace.",
      });
    } catch (error) {
      console.error('Error submitting product:', error);
      toast({
        title: "Failed to submit product",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Employee Innovation Marketplace
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover innovative products created by VirtusCo employees and supported through our innovation nurturing program.
            </p>
            
            {user && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-6" size="lg">
                    <BriefcaseBusiness className="mr-2 h-5 w-5" />
                    Submit Your Innovation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Submit a New Product</DialogTitle>
                  </DialogHeader>
                  <EmployeeProductForm onSubmit={handleNewProduct} />
                </DialogContent>
              </Dialog>
            )}
            
            {!user && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Sign in to submit your own innovation</p>
                <Button variant="outline" asChild>
                  <a href="/auth">Sign In to Participate</a>
                </Button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No products available yet. Be the first to submit your innovation!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <Card key={product.id} className="flex flex-col h-full card-animate">
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
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> 
                      {cartItems.find(item => item.id === product.id) 
                        ? `In Cart (${cartItems.find(item => item.id === product.id)?.quantity})`
                        : "Add to Cart"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeProducts;
