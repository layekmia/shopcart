import AddToWishlistButton from "@/components/AddToWishlistButton";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartProductCard({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const getGroupItems = useStore((state) => state.getGroupedItems());
  const deleteProduct = useStore((state) => state.deleteCartItem);

  return (
    <div className="lg:col-span-2 hidden md:block rounded-lg">
      <div className="border bg-white rounded-md">
        {getGroupItems?.map(({ product, quantity }) => {
          const itemCount = getGroupItems.length;
          return (
            <div
              key={product?._id}
              className="border-b  p-2.5 last:border-b-0 flex items-center justify-between gap-5"
            >
              <div className="flex flex-1 items-start gap-3 h-36 md:h-44 p-0.5 md:p-1">
                {product?.images && (
                  <Link
                    className="border p-0.5 md:p-1 rounded-md overflow-hidden group"
                    href={`/product/${product?.slug?.current}`}
                  >
                    <Image
                      unoptimized
                      src={urlFor(product?.images[0]).url()}
                      alt="Product Image"
                      width={500}
                      height={500}
                      loading="lazy"
                      className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                    />
                  </Link>
                )}
                <div className="h-full flex flex-1 flex-col justify-between py-1">
                  <div className="flex flex-col gap-0.5 md:gap-1.5">
                    <h2 className="text-base font-semibold line-camp-1">
                      {product?.name}
                    </h2>
                    <p className="text-sm capitalize">
                      Variant:{" "}
                      <span className="font-semibold">{product?.variant}</span>
                    </p>
                    <p className="text-sm capitalize">
                      Status:{" "}
                      <span className="font-semibold">{product?.status}</span>
                    </p>
                  </div>
                  <div className="">
                    <TooltipProvider>
                      <div className="space-x-2 flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AddToWishlistButton
                              className="relative top-0 right-0"
                              product={product}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="font-bold">
                            Add to favorite
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Trash
                              onClick={() => {
                                deleteProduct(product?._id);
                                toast.success("Product delete successfully");
                              }}
                              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                            />
                          </TooltipTrigger>
                          <TooltipContent className="font-bold bg-red-600">
                            Delete product
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="flex  flex-col h-36 md:h-44 justify-between">
                <PriceFormatter
                  amount={(product?.price as number) * itemCount}
                  className="font-bold text-lg"
                />
                <QuantityButtons product={product} />
              </div>
            </div>
          );
        })}
        <Button
          className="m-5 font-semibold"
          variant={`destructive`}
          onClick={() => setIsOpen(true)}
        >
          Reset Cart
        </Button>
      </div>
    </div>
  );
}
