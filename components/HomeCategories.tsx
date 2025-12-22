import Title from "./ui/text";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Category } from "@/sanity.types";

export default function HomeCategories({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Popular categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-shop_light_bg p-5 flex items-center gap-3 group"
          >
            {category?.image && (
              <div
                key={category?._id}
                className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1"
              >
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image unoptimized
                    src={urlFor(category?.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain hover:scale-105 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-1">
              <h2 className="font-bold text-shop_dark_green">
                {category?.title}
              </h2>
              <p className="text-sm">
                <span className="font-bold text-shop_dark_green">
                  {`(${category?.productCount})`} items Available
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
