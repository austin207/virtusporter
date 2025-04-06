
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EmployeeProductFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    image: string;
  }) => void;
}

const EmployeeProductForm = ({ onSubmit }: EmployeeProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "/placeholder.svg" // Default image
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simple validation
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }
    
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your product..."
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price (USD) *</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="29.99"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          placeholder="/placeholder.svg"
          value={formData.image}
          onChange={handleChange}
        />
        <p className="text-sm text-gray-500">Leave blank to use default image</p>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button 
          variant="outline" 
          type="button"
          onClick={() => onSubmit({
            name: "Sample Product",
            description: "This is a sample product description.",
            price: 19.99,
            image: "/placeholder.svg"
          })}
        >
          Use Sample Data
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Product"}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeProductForm;
