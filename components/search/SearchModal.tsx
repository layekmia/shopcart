"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import AddToCartButton from "../AddToCartButton";
import { Input } from "../ui/input";
import SearchLoader from "./SearchLoader";
import SuggestedSearch from "./SugestedSearch";

export function SearchModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchQuery = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    await new Promise((res) => setTimeout(res, 300));
    try {
      setLoading(true);

      const response = await fetch(`/api/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data.products);
    } catch (error) {
      console.log("Search error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <CommandDialog className="" open={open} onOpenChange={handleModalClose}>
      <Command className="rounded-lg border h-[400px] shadow-md md:min-w-[450px]">
        <h2 className="px-3 pt-4 pb-1 text-xl font-medium">
          Product Searchbar
        </h2>

        <div className="mx-3 border rounded-md relative">
          <Input
            placeholder="Search your product here... "
            value={query}
            onChange={(e) => handleSearchQuery(e.target.value)}
            className="pr-10 focus:ring-0" // Add padding for the icon
          />

          {/* Clear button - shows only when there's text */}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                // Focus back on input after clear
                (
                  document.querySelector(
                    "[cmdk-input]"
                  ) as HTMLInputElement | null
                )?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <CommandList className="">
          {!loading && !query && (
            <div>
              <SuggestedSearch
                onSearchClick={(searchQuery) => {
                  setQuery(searchQuery);
                  handleSearchQuery(searchQuery);
                }}
              />
            </div>
          )}

          <div className="p-2">
            {loading && <SearchLoader>Searching in progress...</SearchLoader>}

            {!loading && query && results.length > 0 && (
              <div className="w-full bg-white border border-gray-200 rounded-md  max-h-[300px] overflow-y-auto">
                {results?.map((product) => (
                  <div
                    key={product?._id}
                    className="flex items-center gap-3 p-2 border-b border-gray-200 last:border-0 h-[110px]"
                  >
                    <Link
                      onClick={handleModalClose}
                      href={`/product/${product?.slug?.current}`}
                      className="w-20 h-20 rounded-sm shrink-0 border"
                    >
                      <Image
                        src={urlFor(product?.images![0]).url()}
                        alt="product Image"
                        unoptimized
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded hover:scale-110 hoverEffect"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate text-darkColor">
                        {product?.name || "Product Name"}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-base text-shop_dark_green">
                          ${product?.price?.toFixed(2) || "0.00"}
                        </span>

                        {product?.discount && product.discount > 0 && (
                          <>
                            <span className="text-gray-500 line-through text-sm">
                              $
                              {(
                                (product.price || 0) + product.discount
                              ).toFixed(2)}
                            </span>
                            <span className="text-red-500 text-xs font-semibold">
                              -{product.discount}%
                            </span>
                          </>
                        )}
                      </div>

                      <AddToCartButton className="w-fit" product={product} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. No results */}
            {!loading && query && results.length === 0 && (
              <CommandEmpty>
                Nothing match with the keyword <b>{query}</b>.
                <br />
                Please try something else.
              </CommandEmpty>
            )}
          </div>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
