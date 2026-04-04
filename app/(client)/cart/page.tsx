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
import { realtimeClient } from "@/sanity/lib/client";
import useStore from "@/store";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import { deleteAddress } from "@/actions/deleteAddress";
import { AddressForm } from "@/components/AddressForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import CartProductCard from "./CartProductCard";
import MobileCartProductCard from "./MobileCartProductCard";
import Loader from "./Loader";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const getGroupItems = useStore((state) => state.getGroupedItems());
  const resetCart = useStore((state) => state.resetCart);
  const getSubTotalPrice = useStore((state) => state.getSubTotalPrice);
  const getTotalDiscount = useStore((state) => state.getTotalDiscount);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const hasHydrated = useStore((state) => state.hasHydrated);

  const [addresses, setAddress] = useState<Address[] | null>(null);
  const defaultAddress = addresses?.find((address) => address.default);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddress = useCallback(async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      const query = `*[_type == "address" && email == $email] | order(createdAt desc)`;
      const data = await realtimeClient.fetch(query, {
        email: session.user.email,
      });

      setAddress([...data]);

      const defaultAddr = data.find((addr: Address) => addr.default);
      if (defaultAddr) {
        setSelectedAddress({ ...defaultAddr });
      } else if (data.length > 0) {
        setSelectedAddress({ ...data[0] });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("address fetching error", err.message);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchAddress();
    }
  }, [session?.user?.email, fetchAddress]);

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: session?.user?.name ?? "Anonymous",
        customerEmail: session?.user?.email ?? "Anonymous",
        clerkUserId: session?.user?.id,
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


  if(isPending){
    return <Loader/>
  }

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {session ? (
        getGroupItems.length === 0 ? (
          <EmptyCart />
        ) : (
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
                      {addresses ? (
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
                                    key={address?._id}
                                    className="flex items-center justify-between mb-4"
                                  >
                                    <div
                                      onClick={() =>
                                        setSelectedAddress(address)
                                      }
                                      className={`flex items-center space-x-2 flex-1 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"}`}
                                    >
                                      <RadioGroupItem
                                        id={address?._id}
                                        value={address?._id.toString()}
                                      />
                                      <Label
                                        htmlFor={address?._id}
                                        className="grid gap-1.5 flex-1 cursor-pointer"
                                      >
                                        <span className="font-semibold">
                                          {address?.name}
                                        </span>
                                        <span className="text-sm text-black/60">
                                          {address?.address}, {address?.city},{" "}
                                          {address?.zip}
                                        </span>
                                      </Label>
                                    </div>

                                    {/* Delete Button */}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        // Add confirmation dialog here
                                        const result = await deleteAddress(
                                          address._id,
                                        );
                                        if (result.success) {
                                          fetchAddress(); // Refresh list
                                          toast.success("Address deleted");
                                        } else {
                                          toast.error("Failed to delete");
                                        }
                                      }}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </RadioGroup>
                              <AddressForm onSuccess={fetchAddress} />
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">
                            no saved address found
                          </p>
                          <AddressForm onSuccess={fetchAddress} />
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
                                  key={address?._id}
                                  className="flex items-center justify-between mb-4"
                                >
                                  <div
                                    onClick={() => setSelectedAddress(address)}
                                    className={`flex items-center space-x-2 flex-1 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"}`}
                                  >
                                    <RadioGroupItem
                                      id={address?._id}
                                      value={address?._id.toString()}
                                    />
                                    <Label
                                      htmlFor={address?._id}
                                      className="grid gap-1.5 flex-1 cursor-pointer"
                                    >
                                      <span className="font-semibold">
                                        {address?.name}
                                      </span>
                                      <span className="text-sm text-black/60">
                                        {address?.address}, {address?.city},{" "}
                                        {address?.zip}
                                      </span>
                                    </Label>
                                  </div>

                                  {/* Delete Button */}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      // Add confirmation dialog here
                                      const result = await deleteAddress(
                                        address._id,
                                      );
                                      if (result.success) {
                                        fetchAddress(); // Refresh list
                                        toast.success("Address deleted");
                                      } else {
                                        toast.error("Failed to delete");
                                      }
                                    }}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </RadioGroup>

                            <AddressForm onSuccess={fetchAddress} />
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
        )
      ) : (
        <NoAccess />
      )}
    </div>
  );
}
