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
        <div className=" mb-5">
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
          {/* Categories and Brands can be rendered here */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
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

          {/* Product section */}
          <div className="flex-1 pt-5 ">
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
