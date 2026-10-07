import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { OxLink } from "@/components/ox/primitives";
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
      <div className="flex flex-col items-start gap-4">
        <p className="eyebrow text-quiet">Sign in to submit your own innovation</p>
        <OxLink to="/auth" variant="outline">
          Sign In to Participate
        </OxLink>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-3 bg-cream px-7 py-[1.05rem] text-[0.95rem] font-semibold leading-none text-ink transition-colors hover:bg-card"
        >
          Submit Your Innovation
          <span aria-hidden className="arw">
            →
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto border-ink/15 bg-paper p-[clamp(22px,3vw,40px)] shadow-none sm:max-w-[560px] sm:rounded-none [&>button]:rounded-none [&>button]:bg-transparent">
        <DialogHeader>
          <p className="eyebrow mb-2 text-quiet">Marketplace</p>
          <DialogTitle className="h-card text-ink">Submit a New Product</DialogTitle>
        </DialogHeader>
        <EmployeeProductForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductSubmitButton;
