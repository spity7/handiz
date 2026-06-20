import StudentProjectCardSkeleton from "./StudentProjectCardSkeleton";

type OfficesGridSkeletonProps = {
  count?: number;
};

export default function OfficesGridSkeleton({
  count = 12,
}: OfficesGridSkeletonProps) {
  return (
    <div
      className="tf-container tf-spacing-1"
      aria-busy="true"
      aria-label="Loading offices"
    >
      <div className="heading-section mb_28">
        <h3 className="title">Arch Offices</h3>
      </div>
      <div className="tf-grid-layout xxl-col-6 xl-col-5 lg-col-4 md-col-3 sm-col-2">
        {Array.from({ length: count }, (_, index) => (
          <StudentProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
