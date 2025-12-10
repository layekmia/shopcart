"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import Title from "@/components/Title";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const {
    deleteCartItem,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const getGroupItems = useStore((state) => state.getGroupedItems());

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  //   const [addresses, setAddress] = useState<>(null)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {getGroupItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>
              <div
                className="grid lg:grid-cols-3
               md:gap-8"
              >
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {getGroupItems?.map(({ product, quantity }) => {
                      const itemCount = getGroupItems.length;
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-26 md:h-44">
                            {product?.images && (
                              <Link className="border p-0.5 md:p-1 rounded-md overflow-hidden group" href={`/product/${product?.slug?.current}`}>
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="Product Image"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  unoptimized
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover"
                                />
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>summary</div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
}
