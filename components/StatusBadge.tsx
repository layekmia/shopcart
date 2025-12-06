import { Flame } from "lucide-react";

type ProductStatus = "sale" | "hot" | "new" | null | undefined;

interface ProductBadgeProps {
  status: ProductStatus;
}

export default function ProductBadge({ status }: ProductBadgeProps) {
  if (!status) return null;

  if (status === "sale") {
    return (
      <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green hoverEffect group-hover:text-shop_light_green">
        Sale!
      </p>
    );
  }

  if (status === "hot") {
    return (
      <a
        className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
        href="/deal"
      >
        <Flame
          size={18}
          fill="#fb6c08"
          className="text-shop_orange/05 group-hover:text-shop_orange hoverEffect"
        />
      </a>
    );
  }

  if (status === "new") {
    return (
      <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green hoverEffect group-hover:text-shop_light_green">
        New!
      </p>
    );
  }

  return null;
}
