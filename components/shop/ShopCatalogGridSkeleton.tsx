import ShopProductCardSkeleton from "./ShopProductCardSkeleton";

type ShopCatalogGridSkeletonProps = {
  count?: number;
  className?: string;
  label?: string;
};

export default function ShopCatalogGridSkeleton({
  count = 12,
  className = "tf-grid-layout md-col-2 lg-col-3 xl-col-4 gap30 shop-catalog__grid",
  label = "Loading products",
}: ShopCatalogGridSkeletonProps) {
  return (
    <div
      className={className}
      aria-busy="true"
      aria-label={label}
      role="status"
    >
      {Array.from({ length: count }, (_, index) => (
        <ShopProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
