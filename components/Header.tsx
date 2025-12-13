import { auth, currentUser } from "@clerk/nextjs/server";
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import WishlistIcon from "./WishlistIcon";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

export default async function Header() {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;

  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
    <header className=" py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <Container className="flex items-center justify-between">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 md:gap-0  justify-start ">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <WishlistIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link
                href={`/orders`}
                className="group relative hover:text-shop_light_green hoverEffect"
              >
                <Logs />
                <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>
              <UserButton />
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
