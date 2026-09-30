export default function ShopCartLoadingSkeleton() {
  return (
    <div
      className="shop-cart__panel shop-cart__panel--loading"
      aria-busy="true"
      aria-label="Loading cart"
    >
      <div className="shop-cart__skeleton-rows">
        {[0, 1, 2].map((i) => (
          <div key={i} className="shop-cart__skeleton-row">
            <div className="shop-cart__skeleton-thumb" />
            <div className="shop-cart__skeleton-lines">
              <div className="shop-cart__skeleton-line shop-cart__skeleton-line--title" />
              <div className="shop-cart__skeleton-line shop-cart__skeleton-line--meta" />
            </div>
            <div className="shop-cart__skeleton-qty" />
            <div className="shop-cart__skeleton-price" />
          </div>
        ))}
      </div>
    </div>
  );
}
