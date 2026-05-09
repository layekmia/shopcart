import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CartIcon from "./CartIcon";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchButton from "./search/SearchButton";
import { AuthForm } from "./SignInForm";
import WishlistIcon from "./WishlistIcon";
import { UserDropdown } from "./UserMenu";

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });

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
          <div className="w-1/3 flex items-center justify-end gap-3 md:gap-5 mr-2">
            <SearchButton />
            <CartIcon />
            <WishlistIcon />
          </div>
          {!session ? (
            <AuthForm />
          ) : (
            <UserDropdown
              name={session?.user?.name}
              email={session?.user?.email}
              image={session?.user?.image}
            />
          )}
        </Container>
      </header>

      {/* Mobile Header */}
      <header className="sticky sm:hidden top-0 z-50 bg-white/70 backdrop-blur-md mb-5">
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Logo className="w-24" />
          </div>
          {!session ? (
            <div className="ml-4">
              <AuthForm />
            </div>
          ) : (
            <UserDropdown
              name={session?.user?.name}
              email={session?.user?.email}
              image={session?.user?.image}
            />
          )}
        </div>

        <div className="py-2 px-4 border-t flex items-center justify-between gap-2">
          <SearchButton />
          <div className="flex items-center gap-3">
            <WishlistIcon />
            <CartIcon />
          </div>
        </div>
      </header>
    </>
  );
}
