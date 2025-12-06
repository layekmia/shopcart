import { cn } from "@/lib/utils";

export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold text-shop_dark_green capitalize tracking-wide ",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SubTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("font-semibold text-gray-900 ", className)}>
      {children}
    </h3>
  );
}
export function SubText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h5 className={cn("text-gray-600 text-sm", className)}>{children}</h5>;
}
