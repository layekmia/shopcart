import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrand from "@/components/ShopByBrand";
import { getCategories } from "@/sanity/queries";
export default async function Home() {
  const categories = await getCategories(6);

  return (
    <div>
      <Container>
        <HomeBanner />
        <div className="py-10">
          <ProductGrid />
        </div>
        <HomeCategories categories={categories} />
        <ShopByBrand />
        <LatestBlog/>
      </Container>
    </div>
  );
}
