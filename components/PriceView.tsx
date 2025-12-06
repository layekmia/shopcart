import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

export default function PriceView({ price, discount, className }: Props) {
  return (
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className="text-shop_dark_green" />
        {price && discount && (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className="text-shop_light_text line-through font-normal"
          />
        )}
      </div>
  );
}
