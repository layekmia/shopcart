import { categoriesData, quickLinksData } from "@/constants/data";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t ">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-5">
            <Logo />
            <SubText>
              Discover curated furniture collections at ShopcurtYt, blending
              style and comfort to elevate your living spaces
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName=""
            />
          </div>

          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData.map((item, index) => (
                <li key={index + 1}>
                  <Link
                    className="hover:text-shop_light_green hoverEffect font-medium"
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData.map((item, index) => (
                <li key={index + 1}>
                  <Link
                    className="hover:text-shop_light_green hoverEffect font-medium"
                    href={`/category/${item.href}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Subscribe to our newsletter to receive updates and exclusive
              offers
            </SubText>
            <form className="space-y-4">
              <Input placeholder="Enter your email" type="email" required />
              <Button className="lg:w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            &#169; {new Date().getFullYear()}
            <Logo className="text-sm" />. All rights reserved
          </div>
        </div>
      </Container>
    </footer>
  );
}
