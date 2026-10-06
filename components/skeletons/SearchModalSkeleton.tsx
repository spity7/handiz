type SearchModalSkeletonProps = {
  trendingCount?: number;
};

const FILTER_SECTIONS = ["Categories", "Concepts", "Types"] as const;

export default function SearchModalSkeleton({
  trendingCount = 6,
}: SearchModalSkeletonProps) {
  return (
    <div
      className="search-modal-skeleton"
      aria-busy="true"
      aria-label="Loading filters"
    >
      <div className="search-filters search-modal-skeleton__filters">
        <div className="search-filters__grid">
          {FILTER_SECTIONS.map((section) => (
            <div className="filter-group" key={section}>
              <span className="skeleton-block search-modal-skeleton__title" />
              <span className="skeleton-block search-modal-skeleton__dropdown" />
            </div>
          ))}
        </div>
      </div>

      <div className="tf-line" />

      <div className="trending">
        <span className="skeleton-block search-modal-skeleton__title" />
        <div className="tf-grid-layout lg-col-3 md-col-2">
          {Array.from({ length: trendingCount }, (_, index) => (
            <div
              className="feature-post-item style-small search-modal-skeleton__trending-card item-grid"
              key={index}
            >
              <span className="skeleton-block search-modal-skeleton__thumb" />
              <div className="content flex-grow-1">
                <span className="skeleton-block search-modal-skeleton__line" />
                <span
                  className="skeleton-block search-modal-skeleton__line"
                  style={{ width: "72%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
