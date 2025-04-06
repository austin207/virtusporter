import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import EmployeeProductForm from "@/components/forms/EmployeeProductForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Smart Luggage Tag",
    description: "A digital luggage tag with GPS tracking and mobile notifications.",
    price: 34.99,
    image: "/placeholder.svg",
    employee: "Antony Austin",
    department: "Engineering"
  },
  {
    id: "2",
    name: "Travel Power Adapter",
    description: "Universal travel adapter with USB-C fast charging capabilities.",
    price: 29.99,
    image: "/placeholder.svg",
    employee: "Azeem Kouther",
    department: "Product Design"
  },
  {
    id: "3",
    name: "Baggage Organizer Set",
    description: "Set of 5 compression packing cubes for efficient travel packing.",
    price: 42.50,
    image: "/placeholder.svg",
    employee: "Allen George Thomas",
    department: "Operations"
  },
  {
    id: "4",
    name: "Neck Pillow Pro",
    description: "Memory foam travel pillow with cooling gel technology.",
    price: 24.99,
    image: "/placeholder.svg",
    employee: "Alwin George Thomas",
    department: "Customer Experience"
  },
  {
    id: "5",
    name: "Airport Express Backpack",
    description: "TSA-friendly laptop backpack with RFID protection pockets.",
    price: 79.99,
    image: "/placeholder.svg",
    employee: "Danush Krishna",
    department: "Engineering"
  }
];

const EmployeeProducts = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);

  const handleAddToCart = (productId: string) => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    });
  };

  const handleNewProduct = (productData: any) => {
    const newProduct = {
      id: (products.length + 1).toString(),
      ...productData,
      employee: user?.email?.split('@')[0] || 'Anonymous Employee',
      department: 'Not Specified'
    };
    
    setProducts([...products, newProduct]);
    setOpen(false);
    
    toast({
      title: "Product submitted",
      description: "Your product has been added to the marketplace.",
    });
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

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col h-full card-animate">
                <CardHeader>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>By {product.employee}</span>
                    <span className="text-virtus-primary">${product.price}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Department: {product.department}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeProducts;
