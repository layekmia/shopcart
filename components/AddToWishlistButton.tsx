"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function AddToWishlistButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const favoriteProducts = useStore((s) => s.favoriteProducts);
  const addFavoriteProduct = useStore((s) => s.addFavoriteProduct);
  const removeFavoriteProduct = useStore((s) => s.removeFavoriteProduct);

  // Check if product is in wishlist
  const isFavorite = favoriteProducts.some((p) => p._id === product._id);

  const handleToggle = () => {
    if (isFavorite) {
      removeFavoriteProduct(product._id);
      toast.error(`${product.name?.slice(0, 12)}.. removed from wishlist`);
    } else {
      addFavoriteProduct(product);
      toast.success(`${product.name?.slice(0, 12)}.. added to wishlist`);
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        onClick={handleToggle}
        className={cn(
          "p-2.5 rounded-full cursor-pointer hover:bg-shop_dark_green hover:text-white hoverEffect transition-colors duration-200",
          isFavorite
            ? "bg-shop_dark_green text-white"
            : "bg-white/50 text-black"
        )}
      >
        <Heart size={15} />
      </button>
    </div>
  );
}
