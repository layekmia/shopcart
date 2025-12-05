'use client'

import { AlignLeft } from "lucide-react";
import SideMenu from "./SideMenu";
import { useState } from "react";

export default function MobileMenu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsSidebarOpen((cur) => !cur)} className="hover:text-lightColor hoverEffect md:hidden"><AlignLeft /></button>
            <div className="md:hidden">
                <SideMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            </div>
        </>
    )
}