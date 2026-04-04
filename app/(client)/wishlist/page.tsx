"use client";

import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import WishlistProductList from "@/components/WishlistProductList";
import { authClient } from "@/lib/auth-client";
import Loader from "./Loader";

export default function WishlistPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      {session ? (
        <Container className="py-10 ">
          {/* PAGE HEADING */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
            <p className="text-sm text-gray-500 mt-1">
              All your saved products in one place.
            </p>
          </div>

          <WishlistProductList />
        </Container>
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your saved products!" />
      )}
    </>
  );
}
