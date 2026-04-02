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
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchButton from "./search/SearchButton";
import SignIn from "./SignIn";
import WishlistIcon from "./WishlistIcon";

export default function HeaderClient() {
  // Don't wait for Clerk - use optimistic UI
  const { isLoaded, user } = useUser();
  const { userId } = useAuth();
  const [ordersCount, setOrdersCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Load orders count after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    async function fetchOrdersCount() {
      if (userId) {
        try {
          const response = await fetch(`/api/orders/count?userId=${userId}`);
          const data = await response.json();
          setOrdersCount(data.count || 0);
        } catch (error) {
          console.error("Error fetching orders count:", error);
        }
      }
    }

    if (userId) {
      fetchOrdersCount();
    }
  }, [userId]);

  // Always render header immediately - no waiting!
  // Show actual user data when available, otherwise show placeholder
  const showUserInfo = mounted && isLoaded;

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

            {/* Always render, but content updates when ready */}
            <div className="flex items-center gap-3">
              {showUserInfo ? (
                <>
                  <SignedIn>
                    <Link
                      href="/orders"
                      className="group relative hover:text-shop_light_green hoverEffect"
                    >
                      <Logs />
                      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                        {ordersCount}
                      </span>
                    </Link>
                    <UserButton />
                  </SignedIn>
                  {!user && <SignIn />}
                </>
              ) : (
                // Show minimal placeholder while loading (no skeleton animation)
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100" />
                  <div className="h-8 w-20 rounded-md bg-gray-100" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Header - same pattern */}
      <header className="sticky sm:hidden top-0 z-50 bg-white/70 backdrop-blur-md mb-5">
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Logo className="w-24" />
          </div>
          <div className="flex items-center gap-2">
            <CartIcon />
            {showUserInfo ? (
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
              <div className="h-7 w-7 rounded-full bg-gray-100" />
            )}
          </div>
        </div>

        <div className="py-2 px-4 border-t flex items-center justify-between gap-2">
          <SearchButton />
          <div className="flex items-center gap-3">
            <WishlistIcon />
            <Link href="/orders" className="relative">
              <Logs className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                {showUserInfo ? ordersCount : 0}
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
