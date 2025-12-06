import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";

export default function AddToWishlistButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
    }) {
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <div className=" p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect bg-white/50 cursor-pointer">
        <Heart size={15} />
      </div>
    </div>
  );
}
