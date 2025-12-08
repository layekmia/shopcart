'use client'

import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {
    const pathname = usePathname()

    return (
        <div className="hidden justify-center md:inline-flex w-1/3 items-center gap-7 text-sm capitalize font-semibold text-lightColor">
            {headerData.map(item => <Link className={`hover:text-shop_light_green hoverEffect relative group ${pathname === item?.href && 'text-shop_light_green'}`} href={item.href} key={item.label}>

                {item?.label}
                <span className={`absolute -bottom-0.5 left-1/2 group-hover:left-0 w-0 group-hover:w-1/2 hoverEffect h-0.5 bg-shop_light_green ${pathname === item?.href && 'w-1/2'}`} />
                <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_light_green hoverEffect group-hover:right-0 group-hover:w-1/2 ${pathname === item?.href && 'w-1/2'}`} />
            </Link>)}
        </div>
    )
}