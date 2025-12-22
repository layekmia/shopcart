"use client";

import { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Product } from "@/sanity.types";
import ProductLoadingSpinner from "./ProductLoadingSpinner";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  const query = `*[_type == "product" && variant == $variant] | order(name desc){...,"categories":categories[]->title }`;

  const params = { variant: selectedTab.toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await client.fetch(query, params);
        setProducts(res);
      } catch (err: any) {
        console.error("Product fetching error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelected={setSelectedTab} />
      {loading || products === null ? (
        <ProductLoadingSpinner>Loading Products...</ProductLoadingSpinner>
      ) : products?.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
            {products.map((product) => (
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
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
}
