import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { PriceArray } from "@/constants/data";
import { Label } from "../ui/label";
import ResetButton from "./ResetButton";

interface PriceListProps {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PriceList({
  selectedPrice,
  setSelectedPrice,
}: PriceListProps) {
  return (
    <div className="w-full p-4 bg-white">
      <Title className="font-semibold text-black text-base">Price</Title>
      <RadioGroup
        value={selectedPrice || ""}
        onValueChange={(value) => setSelectedPrice(value)}
        className="mt-2 space-y-2"
      >
        {PriceArray.map((price) => (
          <div
            key={price.title}
            className="flex items-center space-x-2 hover:cursor-pointer "
          >
            <RadioGroupItem
              className="rounded-sm"
              value={price.value}
              id={price.value}
            />
            <Label
              htmlFor={price.value}
              className={`${selectedPrice === price.value ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {price.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice !== null && (
        <ResetButton onReset={() => setSelectedPrice(null)} className="mt-5 " />
      )}
    </div>
  );
}
