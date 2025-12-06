import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
export default function Home() {
  return (
    <div>
      <Container>
        <HomeBanner />
        <div className="py-10">
        <ProductGrid/>
        </div>
      </Container>
    </div>
  );
}
