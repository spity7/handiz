import StudentProjectCardSkeleton from "./StudentProjectCardSkeleton";

type StudentProjectsGridSkeletonProps = {
  count?: number;
  className?: string;
};

export default function StudentProjectsGridSkeleton({
  count = 8,
  className = "projects-grid",
}: StudentProjectsGridSkeletonProps) {
  return (
    <div
      className={className}
      aria-busy="true"
      aria-label="Loading student projects"
    >
      {Array.from({ length: count }, (_, index) => (
        <StudentProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}
