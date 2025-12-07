"use client";

import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";

interface Props {
  categories: Category[];
  slug: string;
}

export default function CategoryProduct({ categories, slug }: Props) {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = async (newSlug: string) => {
    if (newSlug === currentSlug) return; // Prevent unnecessary updates
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false }); // update URL without scroll
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories": categories[]->title}`;

      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (err: any) {
      console.log("Error fetching products", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [router]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col border md:min-w-40 ">
        {categories?.map((category) => (
          <Button
            onClick={() =>
              handleCategoryChange(category?.slug?.current as string)
            }
            className={`bg-transparent border-0  rounded-none text-darkColor shadow-none hover:bg-shop_orange hover:text-white font-semibold border-b last:border-b-0 capitalize transition-colors  hoverEffect ${category?.slug?.current === slug && "bg-shop_orange text-white"}`}
            key={category?._id}
          >
            {category?.title}
          </Button>
        ))}
      </div>
      <div className="flex-1">
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 w-full mt-10">
            <div className="space-x-2  flex items-center ">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        )}
        {products.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
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
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
}
