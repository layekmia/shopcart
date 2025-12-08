import { cn } from "@/lib/utils";

interface Props {
  onReset: () => void;
  className?: string;
}

export default function ResetButton({ onReset, className }: Props) {
  return (
    <button
      onClick={onReset}
      className={cn(
        "text-shop_dark_green underline text-sm font-medium hover:text-red-600 hoverEffect",
        className
      )}
    >
      Reset Filter
    </button>
  );
}
