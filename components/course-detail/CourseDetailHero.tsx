import type { Course, Lesson } from "@/types/course";
import {
  getCourseHeroHighlights,
  getCourseHeroImages,
  formatDuration,
} from "@/lib/courses";
import { getCourseSalePrice, getPublicPriceDisplay } from "@/lib/coursePricing";
import { getLmsUrl } from "@/lib/lms";

type CourseDetailHeroProps = {
  course: Course;
  previewLesson?: Lesson | null;
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 7.1L5.6 9.5L10.8 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 2.2v9.6c0 .7.8 1.1 1.4.7l7.4-4.8c.5-.3.5-1.1 0-1.4L4.4 1.5C3.8 1.1 3 1.5 3 2.2z" />
    </svg>
  );
}

function LessonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="2.5"
        width="11"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M5.5 5.2v3.6l3.2-1.8-3.2-1.8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 4.2V7l2 1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getLevelModifier(level?: string) {
  const normalized = (level || "").trim().toLowerCase();
  if (normalized === "intermediate") return "intermediate";
  if (normalized === "advanced") return "advanced";
  return "beginner";
}

function UsdPrice({ amount }: { amount: number }) {
  return (
    <>
      <span className="course-detail-hero__price-currency">USD</span>{" "}
      {Number(amount).toFixed(2)}
    </>
  );
}

export default function CourseDetailHero({
  course,
  previewLesson = null,
}: CourseDetailHeroProps) {
  const highlights = getCourseHeroHighlights(course);
  const heroImages = getCourseHeroImages(course);
  const priceDisplay = getPublicPriceDisplay(course.pricing);
  const levelModifier = getLevelModifier(course.level);
  const description =
    course.excerpt ||
    "Master professional workflows with step-by-step lessons designed for architects and designers.";
  const enrollHref = getLmsUrl(`/courses/${course.slug}`);
  const hasHeroImage = Boolean(heroImages.desktop || heroImages.mobile);

  return (
    <section
      className={`course-detail-hero${heroImages.hasDedicatedHero ? " course-detail-hero--dedicated" : ""}`}
      aria-labelledby="course-hero-title"
    >
      <div className="course-detail-hero__backdrop" aria-hidden="true">
        {hasHeroImage ? (
          <picture className="course-detail-hero__picture">
            {heroImages.mobile ? (
              <source media="(max-width: 767px)" srcSet={heroImages.mobile} />
            ) : null}
            <img
              src={heroImages.desktop}
              alt=""
              className="course-detail-hero__image"
              fetchPriority="high"
            />
          </picture>
        ) : (
          <div className="course-detail-hero__fallback" />
        )}
        <div className="course-detail-hero__overlay" />
      </div>

      <div className="course-detail-hero__content tf-container">
        <div className="course-detail-hero__panel">
          <div className="course-detail-hero__panel-top">
            <div className="course-detail-hero__meta-row">
              {course.level ? (
                <span
                  className={`course-detail-hero__level course-detail-hero__level--${levelModifier}`}
                >
                  <span
                    className="course-detail-hero__level-dot"
                    aria-hidden="true"
                  />
                  {course.level} Course
                </span>
              ) : null}

              {course.lessonCount || course.totalDurationMinutes ? (
                <div className="course-detail-hero__meta-stats">
                  {course.lessonCount ? (
                    <span className="course-detail-hero__meta-stat">
                      <span
                        className="course-detail-hero__meta-stat-icon"
                        aria-hidden="true"
                      >
                        <LessonIcon />
                      </span>
                      {course.lessonCount}{" "}
                      {course.lessonCount === 1 ? "lesson" : "lessons"}
                    </span>
                  ) : null}
                  {course.totalDurationMinutes ? (
                    <span className="course-detail-hero__meta-stat">
                      <span
                        className="course-detail-hero__meta-stat-icon"
                        aria-hidden="true"
                      >
                        <ClockIcon />
                      </span>
                      {formatDuration(course.totalDurationMinutes)}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <h1 id="course-hero-title" className="course-detail-hero__title">
            {course.title}
          </h1>

          <p className="course-detail-hero__description">{description}</p>

          {highlights.length > 0 ? (
            <ul className="course-detail-hero__highlights">
              {highlights.map((item, index) => (
                <li
                  key={item}
                  className="course-detail-hero__highlight"
                  style={{ animationDelay: `${0.12 + index * 0.07}s` }}
                >
                  <span className="course-detail-hero__highlight-icon">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {priceDisplay.expirationLabel ? (
            <p className="course-detail-hero__offer-note">
              {priceDisplay.expirationLabel}
            </p>
          ) : null}

          <div className="course-detail-hero__actions">
            <div className="course-detail-hero__btn-ring">
              <span
                className="course-detail-hero__btn-border"
                aria-hidden="true"
              />
              <a
                href={enrollHref}
                target="_blank"
                rel="noopener noreferrer"
                className="course-detail-hero__btn course-detail-hero__btn--primary"
              >
                <span className="course-detail-hero__btn-label">
                  {priceDisplay.isFree ? "Enroll for Free" : "Enroll Now"}
                </span>
                <span className="course-detail-hero__btn-icon">
                  <ArrowIcon />
                </span>
              </a>
            </div>
            {previewLesson ? (
              <button
                type="button"
                className="course-detail-hero__btn course-detail-hero__btn--secondary"
              >
                <PlayIcon />
                Watch the Intro
              </button>
            ) : null}
          </div>

          <div className="course-detail-hero__price-row">
            <div
              className="course-detail-hero__price-card"
              aria-label="Course price"
            >
              {priceDisplay.compareAt != null ? (
                <span className="course-detail-hero__price-compare">
                  <UsdPrice amount={priceDisplay.compareAt} />
                </span>
              ) : null}
              <span
                className={`course-detail-hero__price-current${priceDisplay.isFree ? " course-detail-hero__price-current--free" : ""}`}
              >
                {priceDisplay.isFree ? (
                  priceDisplay.primaryLabel
                ) : (
                  <UsdPrice amount={getCourseSalePrice(course.pricing)} />
                )}
              </span>
            </div>
            {priceDisplay.promoLabel ? (
              <span className="course-detail-hero__price-promo">
                {priceDisplay.promoLabel}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
