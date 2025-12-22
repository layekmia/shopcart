"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ResetAlert from "@/components/ResetAlert";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartProductCard from "./CartProductCard";
import MobileCartProductCard from "./MobileCartProductCard";
import Loader from "./Loader";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getGroupItems = useStore((state) => state.getGroupedItems());
  const resetCart = useStore((state) => state.resetCart);
  const getSubTotalPrice = useStore((state) => state.getSubTotalPrice);
  const getTotalDiscount = useStore((state) => state.getTotalDiscount);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const hasHydrated = useStore((state) => state.hasHydrated);

  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
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

  if (!hasHydrated || !isLoaded) return <Loader />;

  const handleCheckout = async () => {
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
                <CartProductCard setIsOpen={setIsOpen} />
                <MobileCartProductCard setIsOpen={setIsOpen} />

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
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50">
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
