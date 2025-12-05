import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div>
          <div>
            <Logo />
            <p>
              Discover curated furniture collections at ShopcurtYt, blending
              style and comfort to elevate your living spaces
            </p>
            <SocialMedia />
          </div>
        </div>
      </Container>
    </footer>
  );
}
