import React from "react";
import { PageHero } from "@/components/ox/Blocks";
import ProductSubmitButton from "./ProductSubmitButton";

interface ProductHeroProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (productData: any) => Promise<void>;
  isLoggedIn: boolean;
}

const ProductHero = ({ open, setOpen, onSubmit, isLoggedIn }: ProductHeroProps) => {
  return (
    <PageHero compact
      eyebrow="Marketplace"
      title={
        <>
          Employee Innovation <span className="text-accent-ink">Marketplace</span>
        </>
      }
      lede="Discover innovative products created by VirtusCo employees and supported through our innovation nurturing program."
    >
      <ProductSubmitButton
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
        isLoggedIn={isLoggedIn}
      />
    </PageHero>
  );
};

export default ProductHero;
