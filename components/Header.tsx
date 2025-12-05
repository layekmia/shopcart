import CartIcon from "./CartIcon";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";

export default function Header() {
    return (
        <header className="bg-white py-5 border-b border-b-black/20">
            <Container className="flex items-center justify-between">
                <div className="w-auto md:w-1/3 flex items-center gap-2.5 md:gap-0  justify-start ">
                    <MobileMenu />
                    <Logo />
                </div>
                <HeaderMenu />
                <div className="w-1/3 flex items-center justify-end gap-5">
                    <SearchBar />
                    <CartIcon />
                    <FavoriteButton />
                    <SignIn />
                </div>
            </Container>
        </header>
    )
}