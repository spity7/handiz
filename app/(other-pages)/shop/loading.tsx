import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ShopCatalogPageSkeleton from "@/components/shop/ShopCatalogPageSkeleton";

export default function Loading() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <ShopCatalogPageSkeleton />
      </div>
      <Footer1 />
    </>
  );
}
