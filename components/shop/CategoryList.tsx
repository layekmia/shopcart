import { Category } from "@/sanity.types";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import ResetButton from "./ResetButton";

interface props {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CategoryList({
  categories,
  selectedCategory,
  setSelectedCategory,
}: props) {
  return (
    <div className="w-full p-4 bg-white">
      <Title className="text-base text-black">ProductCategories</Title>
      <RadioGroup
        value={selectedCategory || ""}
        onValueChange={(value) => setSelectedCategory(value)}
        className="mt-2 space-y-2"
      >
        {categories.map((category) => (
          <div
            key={category?._id}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current as string}
              className="rounded-sm"
            />
            <Label
              htmlFor={category?.slug?.current as string}
              className={`${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedCategory !== null && (
        <ResetButton
          onReset={() => setSelectedCategory(null)}
          className="mt-5 "
        />
      )}
    </div>
  );
}
