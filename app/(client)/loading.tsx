import Logo from "@/components/Logo";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center pt-24 min-h-screen w-full z-10">
      <Logo />
      <div className="space-x-2  flex items-center font-bold text-shop_dark_green">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Shopcart is loading....</span>
      </div>
    </div>
  );
}
