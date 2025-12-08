import { BRANDS_QUERYResult, Category } from "@/sanity.types";
import Container from "./Container";
import Title from "./Title";

interface props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

export default function Shop({ categories, brands }: props) {
  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as you needs
            </Title>
            <button className="text-shop_dark_green underline text-sm font-medium hover:text-red-600 hoverEffect">
              Reset Filter
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          {/* Categories and Brands can be rendered here */}
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-hidden md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50">
            {/* Category list */}
            
            {/* Brands List */}
            {/* PriceList */}
          </div>
          <div>Product</div>
        </div>
      </Container>
    </div>
  );
}
