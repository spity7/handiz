import Link from "next/link";

type ShopCatalogEmptyProps = {
  filtered: boolean;
  onClearFilters: () => void;
};

export default function ShopCatalogEmpty({
  filtered,
  onClearFilters,
}: ShopCatalogEmptyProps) {
  return (
    <div
      className="courses-catalog__empty courses-catalog__empty--filtered shop-catalog__results-empty"
      role="status"
      aria-live="polite"
    >
      <span className="courses-catalog__empty-eyebrow">
        {filtered ? "No matches" : "Shop catalog"}
      </span>
      <div className="courses-catalog__empty-icon" aria-hidden="true">
        <i className={filtered ? "bi bi-search" : "bi bi-bag"} />
      </div>
      <h2 className="courses-catalog__empty-title">
        {filtered
          ? "No products match your filters"
          : "No products available yet"}
      </h2>
      <p className="shop-catalog__results-empty-text">
        {filtered
          ? "Try a different search or category, or reset filters to browse the full catalog."
          : "Check back soon for architecture resources and Handiz merchandise."}
      </p>
      <div className="courses-catalog__empty-action shop-catalog__results-empty-actions">
        {filtered ? (
          <button
            type="button"
            className="tf-btn btn-fill animate-hover-btn btn-switch-text courses-catalog__empty-btn shop-catalog__results-empty-btn"
            onClick={onClearFilters}
          >
            <span>
              <span className="btn-double-text" data-text="Clear filters">
                Clear filters
              </span>
            </span>
          </button>
        ) : (
          <Link
            href="/"
            className="tf-btn btn-fill animate-hover-btn btn-switch-text courses-catalog__empty-btn shop-catalog__results-empty-btn"
          >
            <span>
              <span className="btn-double-text" data-text="Back to home">
                Back to home
              </span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
