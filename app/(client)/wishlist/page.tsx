import Container from "@/components/Container";
import NoAccess from "@/components/NoAccess";
import WishlistProductList from "@/components/WishlistProductList";
import { currentUser } from "@clerk/nextjs/server";

export default async function page() {
  const user = await currentUser();

  return (
    <>
      {user ? (
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
