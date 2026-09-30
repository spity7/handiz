import ShopCatalogGridSkeleton from "./ShopCatalogGridSkeleton";
import ProjectCategoriesSkeleton from "@/components/skeletons/ProjectCategoriesSkeleton";

export default function ShopCatalogPageSkeleton() {
  return (
    <section
      className="shop-catalog shop-catalog--skeleton tf-container w-xxl tf-spacing-1"
      aria-busy="true"
      aria-label="Loading shop"
    >
      <header className="shop-catalog__header shop-catalog-skeleton__header">
        <span className="skeleton-block shop-catalog-skeleton__eyebrow d-inline-block" />
      </header>

      <div
        className="shop-catalog__filters shop-catalog-skeleton__filters page-title homepage-2 sw-layout"
        aria-hidden="true"
      >
        <div className="shop-catalog__filters-inner">
          <div className="shop-catalog__top-row shop-catalog-skeleton__top-row">
            <span className="skeleton-block shop-catalog-skeleton__search d-block" />
            <div className="shop-catalog-skeleton__sort-band">
              <span className="skeleton-block shop-catalog-skeleton__sort-label" />
              <span className="skeleton-block shop-catalog-skeleton__sort-group" />
            </div>
          </div>
          <div className="shop-catalog__categories-row">
            <div className="shop-catalog__categories-track">
              <ProjectCategoriesSkeleton count={6} />
            </div>
          </div>
        </div>
      </div>

      <ShopCatalogGridSkeleton />
    </section>
  );
}
