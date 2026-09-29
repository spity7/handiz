import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ShopHero from "@/components/shop/ShopHero";
import { fetchShopProducts } from "@/lib/shop";

export const metadata = {
  title: "Shop | Handiz",
  description: "Browse architecture tools and Handiz merchandise.",
};

export default async function ShopHomePage() {
  const { products } = await fetchShopProducts({ featured: true, limit: 6 });

  return (
    <>
      <Header1 />
      <div className="main-content">
        <ShopHero featured={products} />
      </div>
      <Footer1 />
    </>
  );
}
