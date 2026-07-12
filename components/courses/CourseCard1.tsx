import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types/course";
import { formatDuration } from "@/lib/courses";
import { formatUsd, getPublicPriceDisplay } from "@/lib/coursePricing";
import { getLmsUrl } from "@/lib/lms";

export default function CourseCard1({ course }: { course: Course }) {
  const priceDisplay = getPublicPriceDisplay(course.pricing);

  return (
    <div className="feature-post-item style-default hover-image-translate">
      {course.thumbnailUrl ? (
        <div className="img-style mb_24">
          <Image
            className="lazyload"
            sizes="(max-width: 328px) 100vw, 328px"
            width={328}
            height={246}
            alt={course.title}
            src={course.thumbnailUrl}
          />
          <div className="wrap-tag">
            <span className="tag categories text-caption-2 text_white">
              {course.level || "Course"}
            </span>
            {course.totalDurationMinutes ? (
              <div className="tag time text-caption-2 text_white">
                <i className="icon-Timer" />{" "}
                {formatDuration(course.totalDurationMinutes)}
              </div>
            ) : null}
          </div>
          <a
            href={getLmsUrl(`/courses/${course.slug}`)}
            className="overlay-link"
          />
        </div>
      ) : (
        ""
      )}
      <div className="content">
        <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase mb_12">
          <li>{course.lessonCount || 0} lessons</li>
          <li>
            <span className="text_secodary2-color">
              {priceDisplay.compareAt != null ? (
                <>
                  <span className="text-muted text-decoration-line-through me-1">
                    {formatUsd(priceDisplay.compareAt)}
                  </span>
                  <span className={priceDisplay.isFree ? "text-success" : ""}>
                    {priceDisplay.primaryLabel}
                  </span>
                </>
              ) : (
                priceDisplay.primaryLabel
              )}
            </span>
          </li>
        </ul>
        <h5 className="title">
          <a
            href={getLmsUrl(`/courses/${course.slug}`)}
            className="line-clamp-2 link"
          >
            {course.title}
          </a>
        </h5>
        {course.excerpt ? (
          <p className="text-body-1 line-clamp-2">{course.excerpt}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
