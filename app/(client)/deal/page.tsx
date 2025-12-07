import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/ui/text";
import { getDealProducts } from "@/sanity/queries";

export const metadata = { title: "Hot Deal" };

export default async function page() {
  const dealProducts = await getDealProducts();

  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">
          Hot Deals of the week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {dealProducts?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
