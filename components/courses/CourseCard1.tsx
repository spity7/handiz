import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types/course";
import { isComingSoonCourse } from "@/lib/courses";
import { getLmsUrl } from "@/lib/lms";

function ProgressCheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
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

function ProgressArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 7h8.6M7.8 4.2L11.1 7l-3.3 2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseCard1({ course }: { course: Course }) {
  const comingSoon = isComingSoonCourse(course);
  const progressPercent = Math.min(
    100,
    Math.max(0, course.progressPercent ?? 0),
  );
  const isComplete =
    progressPercent >= 100 || course.enrollmentStatus === "completed";
  const showProgress = course.isEnrolled && course.progressPercent != null;
  const lmsHref = getLmsUrl(`/courses/${course.slug}`);

  return (
    <div
      className={`feature-post-item style-default hover-image-translate${comingSoon ? " course-card--coming-soon" : ""}`}
      aria-disabled={comingSoon || undefined}
    >
      {course.thumbnailUrl ? (
        <div className="img-style course-card-thumb">
          <Image
            className="lazyload"
            sizes="(max-width: 328px) 100vw, 328px"
            width={328}
            height={246}
            alt={course.title}
            src={course.thumbnailUrl}
          />
          {comingSoon ? (
            <div className="wrap-tag course-card-wrap-tag">
              <span className="tag categories text-caption-2 text_white">
                Coming Soon
              </span>
            </div>
          ) : (
            <Link href={`/courses/${course.slug}`} className="overlay-link" />
          )}
        </div>
      ) : (
        ""
      )}
      <div className="content">
        <h5 className="title">
          {comingSoon ? (
            <span className="line-clamp-2">{course.title}</span>
          ) : (
            <Link
              href={`/courses/${course.slug}`}
              className="line-clamp-2 link"
            >
              {course.title}
            </Link>
          )}
        </h5>
        {course.excerpt ? (
          <p className="text-body-1 line-clamp-2">{course.excerpt}</p>
        ) : (
          ""
        )}
        {showProgress &&
          (isComplete ? (
            <div
              className="course-card-progress course-card-progress--complete"
              aria-label="Course completed"
            >
              <span className="course-card-progress__complete-badge">
                <ProgressCheckIcon />
                Completed
              </span>
              <Link href={lmsHref} className="course-card-progress__action">
                Review
                <ProgressArrowIcon />
              </Link>
            </div>
          ) : (
            <div
              className="course-card-progress"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Course progress: ${progressPercent}%`}
            >
              <div className="course-card-progress__row">
                <span className="course-card-progress__label">
                  Your progress:
                </span>
                <div className="course-card-progress__track">
                  <div
                    className="course-card-progress__fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="course-card-progress__value">
                  {progressPercent}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
