import AddToWishlistButton from "@/components/AddToWishlistButton";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MobileCartProductCard({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const getGroupItems = useStore((state) => state.getGroupedItems());
  const deleteProduct = useStore((state) => state.deleteCartItem);

  return (
    <div className="lg:col-span-2 md:hidden rounded-lg">
      <div className="border bg-white rounded-md">
        {getGroupItems?.map(({ product, quantity }) => {
          const itemCount = getGroupItems.length;
          return (
            <div
              key={product?._id}
              className="border-b  p-2 last:border-b-0 flex items-center justify-between gap-5"
            >
              <div className="flex flex-1 items-start gap-3 h-24 p-0.5 md:p-1">
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
                      className="w-20 h-20 object-cover group-hover:scale-105 hoverEffect"
                    />
                  </Link>
                )}
                <div className="h-full flex flex-1 flex-col justify-between py-1">
                  <div className="flex items-start justify-between gap-1 ">
                    <h2 className="text-xs font-medium line-camp-1">
                      {product?.name}
                    </h2>
                    <PriceFormatter
                      amount={(product?.price as number) * itemCount}
                      className="font-semibold text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <AddToWishlistButton
                        className="relative top-0 right-0"
                        product={product}
                      />

                      <Trash
                        onClick={() => {
                          deleteProduct(product?._id);
                          toast.success("Product delete successfully");
                        }}
                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                      />
                    </div>
                    <QuantityButtons product={product} />
                  </div>
                </div>
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
