
import React from "react";
import ProductSubmitButton from "./ProductSubmitButton";

interface ProductHeroProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (productData: any) => Promise<void>;
  isLoggedIn: boolean;
}

const ProductHero = ({ open, setOpen, onSubmit, isLoggedIn }: ProductHeroProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Employee Innovation Marketplace
      </h1>
      <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
        Discover innovative products created by VirtusCo employees and supported through our innovation nurturing program.
      </p>
      
      <ProductSubmitButton 
        open={open} 
        setOpen={setOpen} 
        onSubmit={onSubmit} 
        isLoggedIn={isLoggedIn} 
      />
    </div>
  );
};

export default ProductHero;
