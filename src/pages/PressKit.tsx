
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Download, FileText, Image, FileIcon, Video } from "lucide-react";
import { dbService, PressKitItem } from "@/services/DatabaseService";
import { useToast } from "@/hooks/use-toast";

const PressKit = () => {
  const [items, setItems] = useState<PressKitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPressKitItems = async () => {
      try {
        setLoading(true);
        const data = await dbService.fetchPressKitItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching press kit items:', error);
        toast({
          title: "Failed to load press kit",
          description: "Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPressKitItems();
  }, [toast]);
  
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  // Helper function to determine icon by file type
  const getItemIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'image':
        return <Image className="h-8 w-8" />;
      case 'video':
        return <Video className="h-8 w-8" />;
      case 'pdf':
        return <FileText className="h-8 w-8" />;
      default:
        return <FileIcon className="h-8 w-8" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              VirtusCo Press Kit
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Download official VirtusCo media resources for press coverage, partnerships, and brand usage.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "primary" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No press kit materials available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {getItemIcon(item.file_type)}
                        <CardTitle className="ml-2">{item.title}</CardTitle>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {item.file_type}
                      </span>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {item.thumbnail_url && (
                      <div className="mb-4 rounded-md overflow-hidden bg-gray-100 flex justify-center">
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="object-contain max-h-48"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href={item.file_url} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PressKit;
