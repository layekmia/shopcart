import { BRANDS_QUERYResult } from "@/sanity.types";
import Title from "../Title";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ResetButton from "./ResetButton";

interface props {
  brands: BRANDS_QUERYResult;
  selectedBrand: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function BrandList({
  brands,
  selectedBrand,
  setSelectedBrand,
}: props) {
  return (
    <div className="w-full p-4 bg-white">
      <Title className="text-base text-black">ProductCategories</Title>
      <RadioGroup
        value={selectedBrand || ""}
        onValueChange={(value) => setSelectedBrand(value)}
        className="mt-2 space-y-2"
      >
        {brands.map((brand) => (
          <div
            key={brand?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current as string}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug?.current as string}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedBrand !== null && (
        <ResetButton onReset={() => setSelectedBrand(null)} className="mt-5 " />
      )}
    </div>
  );
}
