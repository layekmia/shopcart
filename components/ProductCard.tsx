import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import StatusBadge from "./StatusBadge";
import AddToWishlistButton from "./AddToWishlistButton";
import Title from "./ui/text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="text-sm border border-dark_blue/20 rounded-md bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              unoptimized
              src={urlFor(product?.images[0]).url()}
              alt="Product Image"
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-50 md:h-60 object-contain overflow-hidden transition-transform bg-shop_light_bg hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <AddToWishlistButton product={product} />
        <StatusBadge status={product?.status} />
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-shop_light_text">
            {product?.categories?.join(",")}
          </p>
        )}
        <Link href={`/product/${product?.slug?.current}`}>
          <Title className="text-sm line-clamp-1">{product?.name}</Title>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index + 1}
                size={13}
                className={
                  index < 4 ? "text-shop_lighter_green" : "text-shop_light_text"
                }
                fill={index < 4 ? "#93d991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-shop_light_text text-xs tracking-wide">
            5 Reviews
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <p>In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop_light_green font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>
        <PriceView
          price={product?.price as number}
          discount={product?.discount}
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
}
