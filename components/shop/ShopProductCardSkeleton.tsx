type ShopProductCardSkeletonProps = {
  className?: string;
};

export default function ShopProductCardSkeleton({
  className = "",
}: ShopProductCardSkeletonProps) {
  return (
    <article
      className={`shop-product-card-skeleton shop-product-card feature-post-item style-default ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="skeleton-block shop-product-card-skeleton__media d-block" />
      <div className="shop-product-card-skeleton__body">
        <span className="skeleton-block shop-product-card-skeleton__title d-block" />
        <span className="skeleton-block shop-product-card-skeleton__excerpt d-block" />
        <span className="skeleton-block shop-product-card-skeleton__price d-block" />
      </div>
    </article>
  );
}
