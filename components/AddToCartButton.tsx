"use client";

import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddToCartButton({
  product,
  className,
}: {
  product: Product | undefined | null;
  className?: string;
}) {
  const isOutStock = product?.stock === 0;

  const handleAddToCart = () => {
    window.alert("Added to cart");
  };

  return (
    <div>
      <Button
        onClick={handleAddToCart}
        disabled={isOutStock}
        className={cn(
          "w-full text-shop_light_bg bg-shop_dark_green/80 shadow-none border border-shop_dark_green/80 font-semibold tracking-wide hover:text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
          className
        )}
      >
        <ShoppingBag /> {isOutStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
