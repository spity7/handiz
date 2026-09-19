"use client";

import type { Course } from "@/types/course";
import { getCourseSalePrice, getPublicPriceDisplay } from "@/lib/coursePricing";
import { getCourseEnrollmentCta, getCourseEnrollmentHref } from "@/lib/courses";
import { useCourseWithEnrollment } from "@/hooks/useCourseWithEnrollment";
import CourseDetailEnrollCtaPlaceholder from "@/components/course-detail/CourseDetailEnrollCtaPlaceholder";

type CourseDetailEnrollCardProps = {
  course: Course;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
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

function formatUsdAmount(amount: number) {
  return Number(amount).toFixed(2);
}

function CompareUsdPrice({ amount }: { amount: number }) {
  return (
    <s className="course-detail-about__enroll-price-compare">
      USD {formatUsdAmount(amount)}
    </s>
  );
}

function CurrentUsdPrice({ amount }: { amount: number }) {
  return <>USD {formatUsdAmount(amount)}</>;
}

function ProgressCheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 8.1L7 10.1L11 6.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CourseDetailEnrollProgress({
  progressPercent,
  isComplete,
}: {
  progressPercent: number;
  isComplete: boolean;
}) {
  if (isComplete) {
    return (
      <div className="course-detail-about__enroll-status course-detail-about__enroll-status--complete">
        <p className="course-detail-about__enroll-status-badge">
          <ProgressCheckIcon />
          Course completed
        </p>
        <p className="course-detail-about__enroll-status-hint">
          Revisit lessons and resources anytime in the learning portal.
        </p>
      </div>
    );
  }

  const hint =
    progressPercent <= 0
      ? "Open the learning portal to start your first lesson."
      : progressPercent < 100
        ? "Pick up where you left off in the learning portal."
        : null;

  return (
    <div
      className="course-detail-about__enroll-status"
      role="progressbar"
      aria-valuenow={progressPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Course progress: ${progressPercent}%`}
    >
      <div className="course-detail-about__enroll-status-head">
        <span className="course-detail-about__enroll-status-label">
          Your progress
        </span>
        <span className="course-detail-about__enroll-status-value">
          {progressPercent}%
        </span>
      </div>
      <div className="course-detail-about__enroll-status-track">
        <div
          className="course-detail-about__enroll-status-fill"
          style={{
            width: `${progressPercent > 0 ? Math.max(progressPercent, 6) : 0}%`,
          }}
        />
      </div>
      {hint ? (
        <p className="course-detail-about__enroll-status-hint">{hint}</p>
      ) : null}
    </div>
  );
}

export default function CourseDetailEnrollCard({
  course: initialCourse,
}: CourseDetailEnrollCardProps) {
  const { course, ctaReady, authLoading } = useCourseWithEnrollment(
    initialCourse.slug,
    initialCourse,
  );
  const priceDisplay = getPublicPriceDisplay(course.pricing);
  const progressPercent = Math.min(
    100,
    Math.max(0, course.progressPercent ?? 0),
  );
  if (!ctaReady) {
    if (!getCourseEnrollmentHref(initialCourse) && !authLoading) {
      return null;
    }

    return (
      <aside
        className="course-detail-about__enroll-card"
        aria-busy="true"
        aria-label="Loading enrollment"
      >
        <div
          className="course-detail-about__enroll-card-border"
          aria-hidden="true"
        />
        <div className="course-detail-about__enroll-card-inner">
          <p className="course-detail-about__enroll-eyebrow">Ready to start?</p>
          <h4 className="course-detail-about__enroll-title">
            {initialCourse.title}
          </h4>
          <div className="course-detail-about__enroll-actions">
            <CourseDetailEnrollCtaPlaceholder variant="card" />
          </div>
        </div>
      </aside>
    );
  }

  const cta = getCourseEnrollmentCta(course);

  if (!cta) {
    return null;
  }

  const isComplete = cta.mode === "review";
  const showEnrolledStatus =
    course.isEnrolled && course.progressPercent != null;

  return (
    <aside
      className={`course-detail-about__enroll-card${course.isEnrolled ? " course-detail-about__enroll-card--enrolled" : ""}`}
      aria-label={
        course.isEnrolled ? "Continue your course" : "Enroll in this course"
      }
    >
      <div
        className="course-detail-about__enroll-card-border"
        aria-hidden="true"
      />
      <div className="course-detail-about__enroll-card-inner">
        <p className="course-detail-about__enroll-eyebrow">
          {course.isEnrolled
            ? isComplete
              ? "Completed"
              : "You're enrolled"
            : "Ready to start?"}
        </p>
        <h4 className="course-detail-about__enroll-title">{course.title}</h4>

        <div
          className={`course-detail-about__enroll-actions${course.isEnrolled ? " course-detail-about__enroll-actions--enrolled" : ""}`}
        >
          {showEnrolledStatus ? (
            <CourseDetailEnrollProgress
              progressPercent={progressPercent}
              isComplete={isComplete}
            />
          ) : null}
          <div className="course-detail-about__enroll-cta-wrap">
            <span
              className="course-detail-about__enroll-cta-border"
              aria-hidden="true"
            />
            <a
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="course-detail-about__enroll-cta"
            >
              <span className="course-detail-about__enroll-cta-label">
                {cta.label}
              </span>
              <span className="course-detail-about__enroll-cta-icon">
                <ArrowIcon />
              </span>
            </a>
          </div>

          {!course.isEnrolled ? (
            <div
              className="course-detail-about__enroll-price-block"
              aria-label="Course price"
            >
              {priceDisplay.compareAt != null ? (
                <CompareUsdPrice amount={priceDisplay.compareAt} />
              ) : null}
              <span
                className={`course-detail-about__enroll-price-current${priceDisplay.isFree ? " course-detail-about__enroll-price-current--free" : ""}`}
              >
                {priceDisplay.isFree ? (
                  priceDisplay.primaryLabel
                ) : (
                  <CurrentUsdPrice
                    amount={getCourseSalePrice(course.pricing)}
                  />
                )}
              </span>
              {priceDisplay.promoLabel ? (
                <span className="course-detail-about__enroll-price-promo">
                  {priceDisplay.promoLabel}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {!course.isEnrolled && priceDisplay.expirationLabel ? (
          <p className="course-detail-about__enroll-offer-note">
            {priceDisplay.expirationLabel}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
