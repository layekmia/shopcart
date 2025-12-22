"use client";

import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import Container from "./Container";
import Title from "./Title";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResetButton from "./shop/ResetButton";
import { client } from "@/sanity/lib/client";
import ProductLoadingSpinner from "./ProductLoadingSpinner";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Filter, X } from "lucide-react";

interface props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

export default function Shop({ categories, brands }: props) {
  const searchParams = useSearchParams();
  const brandParams = searchParams.get("brand");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-");
        minPrice = parseInt(min, 10);
        maxPrice = parseInt(max, 10);
      }
      const query = `*[_type == "product" && (!defined($selectedCategory) || references(*[_type=="category" && slug.current == $selectedCategory]._id)) && (!defined($selectedBrand) || references(*[_type=="brand" && slug.current == $selectedBrand]._id)) && price >= $minPrice && price <= $maxPrice] | order(name asc){
      ...,"categories":categories[]->title}`;

      const data = await client.fetch<Product[]>(
        query,
        {
          selectedCategory,
          selectedBrand,
          minPrice,
          maxPrice,
        },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedPrice(null);
  };

  return (
    <div className="border-t pb-10">
      <Container className="mt-5">
        <div className=" mb-2 md:mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as you needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && <ResetButton onReset={handleReset} />}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          {/* Mobile Filter Button - Only shows on small screens */}
          <div className="md:hidden flex items-center justify-between mt-4 px-4">
            <h2 className="text-lg font-semibold">Products</h2>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-shop_dark_green text-white rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Categories and Brands can be rendered here */}
          <div className="hidden md:block md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
            {/* Category list */}
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            {/* Brands List */}
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            {/* PriceList */}
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>

          <div
            className={`fixed inset-0 z-60 md:hidden transition-opacity duration-300 ${
              isMobileFilterOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            {/* Drawer */}
            <div
              className={`absolute left-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-2xl
    transform transition-transform duration-300 ease-in-out
    ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {/* Same Filters – reused */}
              <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
                <CategoryList
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                <BrandList
                  brands={brands}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                />

                <PriceList
                  selectedPrice={selectedPrice}
                  setSelectedPrice={setSelectedPrice}
                />
                
              </div>
            </div>
          </div>

          {/* )} */}

          {/* Product section */}
          <div className="flex-1 md:pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {isLoading || products === null ? (
                <ProductLoadingSpinner>
                  Loading Products...
                </ProductLoadingSpinner>
              ) : products.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {products.map((product: Product) => (
                      <AnimatePresence key={product?._id}>
                        <motion.div
                          layout
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.2 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              ) : (
                <NoProductAvailable className="mt-0 bg-white" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
