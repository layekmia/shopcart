"use client";

import AddToWishlistButton from "@/components/AddToWishlistButton";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ResetAlert from "@/components/ResetAlert";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getGroupItems = useStore((state) => state.getGroupedItems());
  const deleteProduct = useStore((state) => state.deleteCartItem);
  const resetCart = useStore((state) => state.resetCart);
  const getSubTotalPrice = useStore((state) => state.getSubTotalPrice);
  const getTotalDiscount = useStore((state) => state.getTotalDiscount);
  const getTotalPrice = useStore((state) => state.getTotalPrice);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddress] = useState<Address[] | null>(null);
  const defaultAddress = addresses?.find((address) => address.default);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "address"] | order(publishedAt desc)`;

      const data = await client.fetch(query);
      setAddress(data);
      const defaultAddress = data.find((addr: Address) => addr.default);

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]); // Optional: select first address if no default;
      }
    } catch (err: any) {
      console.log("address fetching error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleCheckout = async () => {
    console.log("hello");
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Anonymous",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Anonymous",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(getGroupItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.log("Checkout session error ", err);
    } finally {
      setLoading(false);
    }
  };

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
                          <div className="flex flex-1 items-start gap-3 h-36 md:h-44 p-0.5 md:p-1">
                            {product?.images && (
                              <Link
                                className="border p-0.5 md:p-1 rounded-md overflow-hidden group"
                                href={`/product/${product?.slug?.current}`}
                              >
                                <Image unoptimized
                                  src={urlFor(product?.images[0]).url()}
                                  alt="Product Image"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-camp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <TooltipProvider>
                                  <div className="space-x-2">
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <AddToWishlistButton
                                          className="relative top-0 right-0"
                                          product={product}
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent className="font-bold">
                                        Add to favorite
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Trash
                                          onClick={() => {
                                            deleteProduct(product?._id);
                                            toast.success(
                                              "Product delete successfully"
                                            );
                                          }}
                                          className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent className="font-bold bg-red-600">
                                        Delete product
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex  flex-col h-36 md:h-44 justify-between">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="font-bold text-lg"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      className="m-5 font-semibold"
                      variant={`destructive`}
                      onClick={() => setIsOpen(true)}
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>

                {/*Desktop  summary */}
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                      <h2
                        className="text-xl
                       font-semibold mb-4"
                      >
                        Order summary
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Discount</span>
                          <PriceFormatter amount={getTotalDiscount()} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter
                            className="text-lg font-bold text-black"
                            amount={getTotalPrice()}
                          />
                        </div>
                        <Button
                          disabled={loading}
                          onClick={handleCheckout}
                          className="w-full bg-shop_dark_green/80 hover:bg-shop_dark_green rounded-full font-semibold tracking-wide hoverEffect"
                        >
                          {loading ? "Please wait..." : "Proceed to checkout"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* address */}
                  <div className="max-md:hidden">
                    {addresses && (
                      <div>
                        <Card className="bg-white rounded-md mt-5">
                          <CardHeader>
                            <CardTitle>Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              defaultValue={defaultAddress?._id.toString()}
                            >
                              {addresses?.map((address) => (
                                <div
                                  onClick={() => setSelectedAddress(address)}
                                  className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"}`}
                                  key={address?._id}
                                >
                                  <RadioGroupItem
                                    id={address?._id}
                                    value={address?._id.toString()}
                                  />
                                  <Label
                                    htmlFor={address?._id}
                                    className="grid gap-1.5 flex-1"
                                  >
                                    <span className="font-semibold">
                                      {address?.name}
                                    </span>
                                    <span className="text-sm text-black/60">
                                      {address?.address}
                                      {address?.city}
                                      {address?.zip}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button variant={`outline`} className="w-full mt-4">
                              Add New Address+
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                  {/* Mobile Address Button */}
                  <div className="md:hidden px-4 mt-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full font-medium"
                        >
                          Select Delivery Address
                        </Button>
                      </SheetTrigger>

                      <SheetContent
                        side="bottom"
                        className="p-4 h-[70vh] overflow-y-auto"
                      >
                        <SheetHeader>
                          <SheetTitle className="text-lg font-semibold">
                            Delivery Address
                          </SheetTitle>
                        </SheetHeader>

                        <div className="mt-4">
                          <RadioGroup
                            defaultValue={defaultAddress?._id.toString()}
                          >
                            {addresses?.map((address) => (
                              <div
                                onClick={() => setSelectedAddress(address)}
                                key={address?._id}
                                className={`flex items-center space-x-3 mb-4 cursor-pointer p-3 rounded-md border 
                ${selectedAddress?._id === address?._id ? "border-shop_dark_green bg-shop_dark_green/5" : ""}
              `}
                              >
                                <RadioGroupItem
                                  value={address?._id.toString()}
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold">
                                    {address?.name}
                                  </span>
                                  <span className="text-sm text-black/60">
                                    {address?.address}, {address?.city},{" "}
                                    {address?.zip}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>

                          <Button variant="outline" className="w-full mt-4">
                            Add New Address +
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                {/* Mobile Order Summary */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg">
                  <div className="p-4 space-y-3">
                    {/* Top Row (Subtotal + Total) */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Subtotal</span>
                      <PriceFormatter amount={getSubTotalPrice()} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Discount</span>
                      <PriceFormatter amount={getTotalDiscount()} />
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex items-center justify-between font-semibold text-lg">
                      <span>Total</span>
                      <PriceFormatter
                        className="text-lg font-bold text-black"
                        amount={getTotalPrice()}
                      />
                    </div>

                    {/* Checkout Button */}
                    <Button
                      className="w-full bg-shop_dark_green/80 hover:bg-shop_dark_green rounded-full font-semibold tracking-wide hoverEffect"
                      disabled={loading}
                      onClick={handleCheckout}
                    >
                      {loading ? "Please wait..." : "Proceed to checkout"}
                    </Button>
                  </div>
                </div>
              </div>
              <ResetAlert
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onReset={resetCart}
                title="Reset Your Cart?"
                details="Are you sure you want to reset your cart? This action cannot be undone."
              />
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
