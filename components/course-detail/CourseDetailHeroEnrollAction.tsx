"use client";

import type { Course } from "@/types/course";
import { getCourseEnrollmentCta, getCourseEnrollmentHref } from "@/lib/courses";
import { useCourseWithEnrollment } from "@/hooks/useCourseWithEnrollment";
import CourseDetailEnrollCtaPlaceholder from "@/components/course-detail/CourseDetailEnrollCtaPlaceholder";

type CourseDetailHeroEnrollActionProps = {
  course: Course;
};

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 9h10.2M9.8 4.7L14.3 9l-4.5 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseDetailHeroEnrollAction({
  course: initialCourse,
}: CourseDetailHeroEnrollActionProps) {
  const { course, ctaReady, authLoading } = useCourseWithEnrollment(
    initialCourse.slug,
    initialCourse,
  );

  if (!ctaReady) {
    const mightHaveCta =
      Boolean(getCourseEnrollmentHref(initialCourse)) || authLoading;

    if (!mightHaveCta) {
      return null;
    }

    return <CourseDetailEnrollCtaPlaceholder variant="hero" />;
  }

  const cta = getCourseEnrollmentCta(course);

  if (!cta) {
    return null;
  }

  return (
    <div className="course-detail-hero__btn-ring">
      <span className="course-detail-hero__btn-border" aria-hidden="true" />
      <a
        href={cta.href}
        {...(cta.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="course-detail-hero__btn course-detail-hero__btn--primary"
      >
        <span className="course-detail-hero__btn-label">{cta.label}</span>
        <span className="course-detail-hero__btn-icon">
          <ArrowIcon />
        </span>
      </a>
    </div>
  );
}
