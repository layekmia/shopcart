import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}

export default function HomeTabBar({ selectedTab, onTabSelected }: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center flex-wrap gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelected(item.title)}
            className={`border border-shop_light_green/30 px-5 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hoverEffect hover:text-white ${selectedTab === item?.title ? "bg-shop_light_green text-white border-shop_light_green" : "bg-shop_light_green/20"}`}
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
