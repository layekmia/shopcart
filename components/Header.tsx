"use client";

import {
  useUser,
  useAuth,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Logs } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrdersCount } from "@/actions/getOrdersCount";
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchButton from "./search/SearchButton";
import SignIn from "./SignIn";
import WishlistIcon from "./WishlistIcon";

export default function HeaderClient() {
  const { isLoaded, user } = useUser();
  const { userId } = useAuth();
  const [ordersCount, setOrdersCount] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  // Load orders count using server action
  useEffect(() => {
    async function fetchOrdersCount() {
      if (userId) {
        try {
          setIsLoadingCount(true);
          const result = await getOrdersCount();
          setOrdersCount(result.count);
        } catch (error) {
          console.error("Error fetching orders count:", error);
        } finally {
          setIsLoadingCount(false);
        }
      } else {
        setIsLoadingCount(false);
      }
    }

    if (isLoaded) {
      fetchOrdersCount();
    }
  }, [userId, isLoaded]);

  // Show loading state while fetching orders
  const showLoading = !isLoaded || isLoadingCount;
  const displayCount = showLoading ? 0 : ordersCount;

  return (
    <>
      {/* Desktop Header */}
      <header className="max-sm:hidden py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
        <Container className="flex items-center justify-between">
          <div className="w-auto md:w-1/3 flex items-center gap-2 md:gap-0 justify-start">
            <MobileMenu />
            <Logo />
          </div>
          <HeaderMenu />
          <div className="w-1/3 flex items-center justify-end gap-3 md:gap-5">
            <SearchButton />
            <CartIcon />
            <WishlistIcon />

            <div className="flex items-center gap-3">
              {isLoaded ? (
                <>
                  <SignedIn>
                    <Link
                      href="/orders"
                      className="group relative hover:text-shop_light_green hoverEffect"
                    >
                      <Logs />
                      {displayCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                          {displayCount}
                        </span>
                      )}
                    </Link>
                    <UserButton />
                  </SignedIn>
                  {!user && <SignIn />}
                </>
              ) : (
                // Loading placeholders
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
                  <div className="h-8 w-20 rounded-md bg-gray-100 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Header */}
      <header className="sticky sm:hidden top-0 z-50 bg-white/70 backdrop-blur-md mb-5">
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Logo className="w-24" />
          </div>
          <div className="flex items-center gap-2">
            <CartIcon />
            {isLoaded ? (
              <ClerkLoaded>
                <SignedIn>
                  <UserButton
                    appearance={{ elements: { avatarBox: "h-7 w-7" } }}
                  />
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in" className="text-sm font-medium">
                    Login
                  </Link>
                </SignedOut>
              </ClerkLoaded>
            ) : (
              <div className="h-7 w-7 rounded-full bg-gray-100 animate-pulse" />
            )}
          </div>
        </div>

        <div className="py-2 px-4 border-t flex items-center justify-between gap-2">
          <SearchButton />
          <div className="flex items-center gap-3">
            <WishlistIcon />
            <Link href="/orders" className="relative">
              <Logs className="w-5 h-5" />
              {displayCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {displayCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
