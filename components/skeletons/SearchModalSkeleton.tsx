type SearchModalSkeletonProps = {
  trendingCount?: number;
};

export default function SearchModalSkeleton({
  trendingCount = 6,
}: SearchModalSkeletonProps) {
  return (
    <div
      className="search-modal-skeleton"
      aria-busy="true"
      aria-label="Loading filters"
    >
      {["Categories", "Concepts", "Types"].map((section) => (
        <div className="popular-searches mb_16" key={section}>
          <span className="skeleton-block search-modal-skeleton__title" />
          <ul
            className="list d-flex align-items-center flex-wrap"
            style={{ gap: "8px" }}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <li key={`${section}-${index}`}>
                <span className="skeleton-block search-modal-skeleton__chip" />
              </li>
            ))}
          </ul>
        </div>
      ))}

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
