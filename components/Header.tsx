import { currentUser } from "@clerk/nextjs/server";
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import WishlistIcon from "./WishlistIcon";

export default async function Header() {
  const user = await currentUser();
  // console.log(user);

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
              <UserButton />
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
