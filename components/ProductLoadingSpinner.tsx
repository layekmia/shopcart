import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

export default function ProductLoadingSpinner({ className, iconClassName, children }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 gap-4 w-full mt-10",
        className
      )}
    >
      <div className="space-x-2  flex items-center ">
        <Loader2 className={cn("w-5 h-5 animate-spin", iconClassName)} />
        <span>{children || "Product is loading..."}</span>
      </div>
    </div>
  );
}
