import { productType } from "@/constants/data";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function HomeTabBar() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
            className={`border border-shop_light_green/30 px-5 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hoverEffect hover:text-white`}
            key={item.title}
          >
            {item.title} 
          </button>
        ))}
      </div>
      <Link
        className="border border-shop_light_green/30 px-5 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hoverEffect hover:text-white"
        href={`/shop`}
      >
        See all 
      </Link>
    </div>
  );
}
