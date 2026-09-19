type CourseDetailEnrollCtaPlaceholderProps = {
  variant: "hero" | "card";
};

export default function CourseDetailEnrollCtaPlaceholder({
  variant,
}: CourseDetailEnrollCtaPlaceholderProps) {
  if (variant === "hero") {
    return (
      <div
        className="course-detail-hero__btn-ring course-detail-enroll-cta-pending"
        aria-hidden="true"
      >
        <span className="course-detail-hero__btn-border" />
        <span className="course-detail-hero__btn course-detail-hero__btn--primary course-detail-enroll-cta-pending__surface" />
      </div>
    );
  }

  return (
    <div
      className="course-detail-about__enroll-cta-wrap course-detail-enroll-cta-pending"
      aria-hidden="true"
    >
      <span className="course-detail-about__enroll-cta-border" />
      <span className="course-detail-about__enroll-cta course-detail-enroll-cta-pending__surface" />
    </div>
  );
}
