import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Suspense } from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import ShopCatalogPageSkeleton from "@/components/shop/ShopCatalogPageSkeleton";
import { fetchShopCategories, fetchShopProducts } from "@/lib/shop";

export const metadata = {
  title: "Shop | Handiz",
  description: "Browse architecture tools and Handiz merchandise.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = Number(params.page || "1") || 1;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category =
    typeof params.category === "string" ? params.category : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "newest";

  const [catalog, categories] = await Promise.all([
    fetchShopProducts({ page, limit: 12, q, category, sort }),
    fetchShopCategories(),
  ]);

  return (
    <>
      <Header1 />
      <div className="main-content">
        <Suspense fallback={<ShopCatalogPageSkeleton />}>
          <ShopCatalog
            initialProducts={catalog.products}
            initialPagination={
              catalog.pagination ?? { page: 1, limit: 12, total: 0, pages: 0 }
            }
            categories={categories}
          />
        </Suspense>
      </div>
      <Footer1 />
    </>
  );
}
