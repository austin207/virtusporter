
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { dbService, Product } from "@/services/DatabaseService";
import ProductGrid from "@/components/employee-products/ProductGrid";
import ProductHero from "@/components/employee-products/ProductHero";

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
          <ProductHero 
            open={open} 
            setOpen={setOpen} 
            onSubmit={handleNewProduct} 
            isLoggedIn={!!user} 
          />
          <ProductGrid 
            products={products} 
            cartItems={cartItems} 
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeProducts;
