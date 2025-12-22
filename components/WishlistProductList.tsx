"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { Heart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import AddToCartButton from "./AddToCartButton";
import Container from "./Container";
import PriceFormatter from "./PriceFormatter";
import ResetAlert from "./ResetAlert";
import { Button } from "./ui/button";
import Loader from "@/app/(client)/wishlist/Loader";
import { useUser } from "@clerk/nextjs";

export default function WishlistProductList() {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const [isOpen, setIsOpen] = useState(false);

  const favoriteProducts: Product[] = useStore(
    (state) => state.favoriteProducts
  );
  const removeFavoriteProduct = useStore(
    (state) => state.removeFavoriteProduct
  );
  const resetFavoriteProducts = useStore(
    (state) => state.resetFavoriteProducts
  );
  const hasHydrated = useStore((state) => state.hasHydrated);
  const { isLoaded } = useUser();

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProducts.length));
  };

  if (!hasHydrated || !isLoaded) return <Loader />;

  return (
    <Container className="p-0">
      {favoriteProducts?.length > 0 ? (
        <>
          {/* MOBILE & TABLET: CARD LIST */}
          <div className="flex flex-col gap-4 md:hidden">
            {favoriteProducts
              .slice(0, visibleProducts)
              .map((product: Product) => (
                <div
                  key={product._id}
                  className="flex flex-col items-center justify-between p-4 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-1">
                    {product.images && (
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        className="w-16 h-16 relative shrink-0"
                      >
                        <Image
                          unoptimized
                          src={urlFor(product.images[0]).url()}
                          alt={product?.name as string}
                          width={64}
                          height={64}
                          className="rounded-md object-contain w-full h-full"
                        />
                      </Link>
                    )}
                    <div className="flex flex-col">
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.variant ? product.variant : ""}
                      </p>
                      <div className="flex items-center gap-2">
                        <PriceFormatter amount={product.price} />
                        <p
                          className={`text-sm font-medium ${
                            (product?.stock ?? 0) > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {(product?.stock ?? 0) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t  justify-end items-center w-full gap-5 pt-2">
                    <AddToCartButton product={product} className="w-full" />
                    <Trash2
                      onClick={() => {
                        removeFavoriteProduct(product._id);
                        toast.success("Product removed from wishlist");
                      }}
                      size={20}
                      className="text-gray-800 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* DESKTOP: TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProducts
                  .slice(0, visibleProducts)
                  .map((product: Product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 flex items-center gap-2">
                        <Trash2
                          onClick={() => {
                            removeFavoriteProduct(product._id);
                            toast.success("Product removed from wishlist");
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer"
                        />
                        {product.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="border rounded-md group"
                          >
                            <Image
                              unoptimized
                              src={urlFor(product.images[0]).url()}
                              alt={product?.name as string}
                              width={80}
                              height={80}
                              className="rounded-md group-hover:scale-105 hoverEffect object-contain w-20 h-20"
                            />
                          </Link>
                        )}
                        <p className="line-clamp-1">{product.name}</p>
                      </td>
                      <td className="p-2 uppercase text-xs">
                        {product.categories?.join(", ")}
                      </td>
                      <td className="p-2 capitalize">{product.variant}</td>
                      <td
                        className={`p-2 font-medium text-sm ${
                          (product?.stock ?? 0) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {(product?.stock ?? 0) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </td>
                      <td className="p-2">
                        <PriceFormatter amount={product.price} />
                      </td>
                      <td className="p-2">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* LOAD MORE / LOAD LESS */}
          <div className="flex flex-wrap items-center gap-2 my-4">
            {visibleProducts < favoriteProducts?.length && (
              <Button variant="outline" onClick={loadMore}>
                Load More
              </Button>
            )}
            {visibleProducts > 10 && (
              <Button onClick={() => setVisibleProducts(10)} variant="outline">
                Load Less
              </Button>
            )}
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            className="mb-5 font-semibold"
            variant="destructive"
            size="lg"
          >
            Reset Wishlist
          </Button>
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart
              className="h-12 w-12 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Items added to your wishlist will appear here
            </p>
          </div>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      )}
      <ResetAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onReset={resetFavoriteProducts}
        title="Reset Your Wishlist?"
        details="Are you sure you want to reset your cart? This action cannot be undone."
      />
    </Container>
  );
}
