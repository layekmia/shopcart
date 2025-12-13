import Link from "next/link";
import Title from "./ui/text";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

export default async function ShopByBrand() {
  const brands = await getAllBrands();

  return (
    <div className="mb-10 lg:pb-20 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      <Title>Shop By Brands</Title>
      <Link
        href={`/shop`}
        className="text-sm font-semibold tracking-wide hover:text-shop_dark_green hoverEffect"
      >
        View all
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={`/shop?brand=${brand?.slug?.current}`}
            className="bg-white w-36 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg
             shadow-shop_dark_green/20 hoverEffect"
          >
            {brand?.image && (
              <Image
                alt="brandImage"
                src={urlFor(brand?.image).url()}
                width={250}
                height={250}
                className="w-32 h-20 object-contain"
                
              />
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
