import NoAccess from "@/components/NoAccess";
import WishlistProductList from "@/components/WishlistProductList";
import { currentUser } from "@clerk/nextjs/server";

export default async function page() {
  const user = await currentUser();

  return (
    <>
      {user ? (
        <div>
            <WishlistProductList/>
        </div>
      ) : (
        <NoAccess details="Log in to view your wishlist items. Do't miss out on your cart products to make the payment!" />
      )}
    </>
  );
}
