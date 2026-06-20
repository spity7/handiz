type ProjectCategoriesSkeletonProps = {
  count?: number;
};

export default function ProjectCategoriesSkeleton({
  count = 8,
}: ProjectCategoriesSkeletonProps) {
  return (
    <div
      className="project-categories-skeleton"
      aria-busy="true"
      aria-label="Loading categories"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="skeleton-block project-categories-skeleton__chip"
          style={{ width: `${88 + (index % 4) * 18}px` }}
        />
      ))}
    </div>
  );
}
