import Link from "next/link";
import Title from "./ui/text";
import Image from "next/image";
import { banner_1 } from "@/public/assets";
import banner_2 from "@/public/assets/banner/banner_2.jpg";

export default function HomeBanner() {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title>
          Grab upto 50% off on <br /> Selected Headphone
        </Title>
        <Link
          href="/shop"
          className="bg-shop_dark_green/90 text-white/90 text-sm px-5 py-2 rounded-md font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
        >
          Buy Now
        </Link>
      </div>
      <div>
        <Image
          alt="banner image"
          src={banner_1}
          className="hidden md:inline-flex w-96"
        />
      </div>
    </div>
    // <div className="w-full">
    //   <Image alt="banner image" src={banner_2} className="w-full"/>
    // </div>
  );
}
