import { auth, currentUser } from "@clerk/nextjs/server";
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SignIn from "./SignIn";
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import WishlistIcon from "./WishlistIcon";
import Link from "next/link";
import { Logs, Search } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";
import SearchButton from "./search/SearchButton";

export default async function Header() {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;

  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
    <>
      <header className=" max-sm:hidden py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
        <Container className="flex items-center justify-between">
          <div className="w-auto md:w-1/3 flex items-center gap-2 md:gap-0  justify-start ">
            <MobileMenu />
            <Logo />
          </div>
          <HeaderMenu />
          <div className="w-1/3 flex items-center justify-end gap-3 md:gap-5">
            <SearchButton />
            <CartIcon />
            <WishlistIcon />
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href={`/orders`}
                  className="group relative hover:text-shop_light_green hoverEffect"
                >
                  <Logs />
                  <span className="absolute  -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
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
      <header className="sticky sm:hidden top-0 z-50 bg-white/70 backdrop-blur-md mb-5">
        {/* Row 1: Logo + Menu + Cart */}
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Logo className="w-24" />
          </div>
          <div className="flex items-center gap-2">
            <CartIcon />
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
          </div>
        </div>

        {/* Row 2: Search + Icons Row */}
        <div className="py-2 px-4 border-t flex items-center justify-between gap-2">
          {/* Search Input */}
          <SearchButton />

          {/* Icons */}
          <div className="flex items-center gap-3">
            <WishlistIcon />
            <Link href="/orders" className="relative">
              <Logs className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                {orders?.length || 0}
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
