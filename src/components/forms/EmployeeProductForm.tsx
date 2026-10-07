
import { useState } from "react";
import { Button } from "@/components/ui/Button";

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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation errors when user types
    setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Product name is required");
    if (!formData.description.trim()) errors.push("Description is required");
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      errors.push("Price must be a positive number");
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      image: formData.image || "/placeholder.svg",
    };
    
    onSubmit(productData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 pt-2">
      {validationErrors.length > 0 && (
        <div role="alert" className="border-l-2 border-accent bg-card p-4">
          <p className="eyebrow mb-3 text-accent-ink">Please correct the following errors:</p>
          <ul className="space-y-1 font-serif text-[0.95rem] text-body">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="name" className="field-label">Product Name *</label>
        <input
          id="name"
          name="name"
          className="field"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description" className="field-label">Description *</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="field resize-y"
          placeholder="Describe your product..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="price" className="field-label">Price (USD) *</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          className="field"
          placeholder="29.99"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="image" className="field-label">Image URL</label>
        <input
          id="image"
          name="image"
          className="field"
          placeholder="/placeholder.svg"
          value={formData.image}
          onChange={handleChange}
        />
        <p className="mt-2 font-mono text-[11px] tracking-wide text-quiet">Leave blank to use default image</p>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-ink/15 pt-6">
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
