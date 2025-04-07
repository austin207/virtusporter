
import React from "react";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EmployeeProductForm from "@/components/forms/EmployeeProductForm";

interface ProductSubmitButtonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (productData: any) => Promise<void>;
  isLoggedIn: boolean;
}

const ProductSubmitButton = ({ open, setOpen, onSubmit, isLoggedIn }: ProductSubmitButtonProps) => {
  if (!isLoggedIn) {
    return (
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Sign in to submit your own innovation</p>
        <Button variant="outline" asChild>
          <a href="/auth">Sign In to Participate</a>
        </Button>
      </div>
    );
  }

  return (
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
        <EmployeeProductForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductSubmitButton;
