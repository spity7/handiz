type StudentProjectCardSkeletonProps = {
  className?: string;
};

export default function StudentProjectCardSkeleton({
  className = "",
}: StudentProjectCardSkeletonProps) {
  return (
    <div
      className={`feature-post-item style-default student-project-card-skeleton ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="img-style mb_24">
        <span className="skeleton-block student-project-card-skeleton__image" />
        <div className="wrap-tag d-flex gap-2">
          <span className="skeleton-block student-project-card-skeleton__tag" />
          <span className="skeleton-block student-project-card-skeleton__tag" />
        </div>
      </div>

      <div className="content">
        <span className="skeleton-block student-project-card-skeleton__meta" />
        <span className="skeleton-block student-project-card-skeleton__title" />
        <span className="skeleton-block student-project-card-skeleton__title-short" />
        <span className="skeleton-block student-project-card-skeleton__text" />
        <span className="skeleton-block student-project-card-skeleton__text-short" />
      </div>
    </div>
  );
}
