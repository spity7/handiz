export default function CourseDetailSkeleton() {
  return (
    <div
      className="course-detail course-detail--loading"
      aria-busy="true"
      aria-label="Loading course"
    >
      <section className="course-detail-hero course-detail-hero--loading">
        <div className="course-detail-hero__backdrop" aria-hidden="true">
          <div className="course-detail-hero__fallback" />
        </div>
        <div className="course-detail-hero__content tf-container">
          <div className="course-detail-hero__panel course-detail-hero__panel--skeleton">
            <div className="course-detail-hero__panel-top course-detail-hero__panel-top--skeleton">
              <span className="skeleton-block course-detail-hero__skeleton-badge" />
              <span className="skeleton-block course-detail-hero__skeleton-stat" />
            </div>
            <span className="skeleton-block course-detail-hero__skeleton-title" />
            <span className="skeleton-block course-detail-hero__skeleton-line" />
            <span className="skeleton-block course-detail-hero__skeleton-line course-detail-hero__skeleton-line--short" />
            <span className="skeleton-block course-detail-hero__skeleton-highlight" />
            <span className="skeleton-block course-detail-hero__skeleton-highlight" />
            <span className="skeleton-block course-detail-hero__skeleton-highlight" />
            <span className="skeleton-block course-detail-hero__skeleton-actions" />
            <span className="skeleton-block course-detail-hero__skeleton-price" />
          </div>
        </div>
      </section>
    </div>
  );
}
