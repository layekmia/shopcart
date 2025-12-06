import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ className, spanDesign }: { className?: string, spanDesign?: string }) {
    return (
      <Link href="/" className="inline-flex">
        <h2
          className={cn(
            "text-2xl uppercase  text-shop_dark_green tracking-wider hover:text-shop_light_green hoverEffect group   font-black",
            className
          )}
        >
          Shopcar
          <span
            className={cn(
              "text-shop_light_green group-hover:text-shop_dark_green hoverEffect",
              spanDesign
            )}
          >
            t
          </span>
        </h2>
      </Link>
    );
}