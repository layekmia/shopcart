"use client";

import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "../store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

export default function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem, getItemCount } = useStore();
  const isOutStock = product?.stock === 0;

  const itemCount = getItemCount(product?._id);

  const handleAddToCart = (): void => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(`${product?.name?.substring(0, 12)}.. added successfully`);
    } else {
      toast.error("Can't add more than available stock");
    }
  };

  return (
    <div>
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80 mr-1">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
