import type { Course } from "@/types/course";
import { getCourseSalePrice, getPublicPriceDisplay } from "@/lib/coursePricing";
import { getLmsUrl } from "@/lib/lms";

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

export default function CourseDetailEnrollCard({
  course,
}: CourseDetailEnrollCardProps) {
  const priceDisplay = getPublicPriceDisplay(course.pricing);
  const enrollHref = getLmsUrl(`/courses/${course.slug}`);
  const enrollLabel = priceDisplay.isFree ? "Enroll for Free" : "Enroll Now";

  return (
    <aside
      className="course-detail-about__enroll-card"
      aria-label="Enroll in this course"
    >
      <div
        className="course-detail-about__enroll-card-border"
        aria-hidden="true"
      />
      <div className="course-detail-about__enroll-card-inner">
        <p className="course-detail-about__enroll-eyebrow">Ready to start?</p>
        <h4 className="course-detail-about__enroll-title">{course.title}</h4>

        <div className="course-detail-about__enroll-actions">
          <div className="course-detail-about__enroll-cta-wrap">
            <span
              className="course-detail-about__enroll-cta-border"
              aria-hidden="true"
            />
            <a
              href={enrollHref}
              target="_blank"
              rel="noopener noreferrer"
              className="course-detail-about__enroll-cta"
            >
              <span className="course-detail-about__enroll-cta-label">
                {enrollLabel}
              </span>
              <span className="course-detail-about__enroll-cta-icon">
                <ArrowIcon />
              </span>
            </a>
          </div>

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
                <CurrentUsdPrice amount={getCourseSalePrice(course.pricing)} />
              )}
            </span>
            {priceDisplay.promoLabel ? (
              <span className="course-detail-about__enroll-price-promo">
                {priceDisplay.promoLabel}
              </span>
            ) : null}
          </div>
        </div>

        {priceDisplay.expirationLabel ? (
          <p className="course-detail-about__enroll-offer-note">
            {priceDisplay.expirationLabel}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
