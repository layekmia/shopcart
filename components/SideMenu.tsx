'use client'

import { X } from "lucide-react"
import Logo from "./Logo"
import { headerData } from "@/constants/data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SocialMedia from "./SocialMedia"
import { useOutsideClick } from "@/hooks"

interface SidebarProps {
    isOpen: boolean, onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);

    return (
        <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} hoverEffect text-white/80`}>

            <div ref={sideBarRef} className="max-w-72 bg-gray-950 h-screen p-10 border-r border-r-shop_dark_green flex flex-col gap-6">
                <div className="flex items-center justify-between gap-5">
                    <Logo className="text-white" spanDesign="group-hover:text-white" />
                    <button className="hover:cursor-pointer hover:text-shop_light_green hoverEffect" onClick={onClose}><X /></button>
                </div>
                <ul className="flex flex-col items-start space-y-3.5 font-semibold tracking-wide">
                    {headerData?.map(item => <li key={item.label}><Link className={`hover:text-shop_light_green hoverEffect ${pathname === item?.href && 'text-shop_light_green'}`} href={item?.href}>{item?.label}</Link></li>)}
                </ul>
                <SocialMedia />
            </div>
        </div>
    )
}