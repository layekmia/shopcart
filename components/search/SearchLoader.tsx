import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

export default function SearchLoader({
  className,
  iconClassName,
  children,
}: LoadingProps) {
  return (
    <div className={cn("flex items-center justify-center py-5", className)}>
      <div className="space-x-2  flex items-center text-shop_dark_green">
        <Loader2 className={cn("w-5 h-5 animate-spin", iconClassName)} />
        <span>{children || "Product is loading..."}</span>
      </div>
    </div>
  );
}
