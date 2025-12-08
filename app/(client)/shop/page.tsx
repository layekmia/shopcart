import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";

export default async function page() {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div>
      <Shop categories={categories} brands={brands} />
    </div>
  );
}
