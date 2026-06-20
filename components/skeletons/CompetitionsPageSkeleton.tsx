export default function CompetitionsPageSkeleton() {
  return (
    <div
      className="section-editor-pick mt_22 mb_27"
      aria-busy="true"
      aria-label="Loading competitions"
    >
      <div className="tf-container">
        <div className="heading-section mb_27">
          <h3>Competitions</h3>
        </div>
        <div className="row wrap">
          <div className="col-lg-6">
            <div className="feature-post-item style-default mb-4">
              <span className="skeleton-block competitions-page-skeleton__hero d-block rounded mb-4" />
              <span className="skeleton-block competitions-page-skeleton__line d-block mb-3" />
              <span className="skeleton-block competitions-page-skeleton__title d-block mb-3" />
              <span className="skeleton-block competitions-page-skeleton__line d-block mb-2" />
              <span
                className="skeleton-block competitions-page-skeleton__line d-block"
                style={{ width: "78%" }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                className="feature-post-item style-list v2 d-flex gap-3 mb-4"
                key={index}
              >
                <span className="skeleton-block competitions-page-skeleton__thumb rounded flex-shrink-0" />
                <div className="flex-grow-1">
                  <span
                    className="skeleton-block competitions-page-skeleton__line d-block mb-2"
                    style={{ width: "55%" }}
                  />
                  <span className="skeleton-block competitions-page-skeleton__title d-block mb-2" />
                  <span
                    className="skeleton-block competitions-page-skeleton__line d-block"
                    style={{ width: "88%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
