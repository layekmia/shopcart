import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default function FavoriteButton() {
    return (
        <div>
            <Link href={"/wishlist"} className="group relative">
                <HeartIcon className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
                <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">0</span>
            </Link>
        </div>
    )
}