import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types/course";
import { formatDuration } from "@/lib/courses";
import { formatUsd, getPublicPriceDisplay } from "@/lib/coursePricing";

export default function CourseCard1({ course }: { course: Course }) {
  const priceDisplay = getPublicPriceDisplay(course.pricing);

  return (
    <div className="feature-post-item style-default hover-image-translate">
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
          <Link href={`/courses/${course.slug}`} className="overlay-link" />
        </div>
      ) : (
        ""
      )}
      <div className="content">
        <h5 className="title">
          <Link href={`/courses/${course.slug}`} className="line-clamp-2 link">
            {course.title}
          </Link>
        </h5>
        {course.isEnrolled && course.progressPercent != null && (
          <p className="text-body-2 text-success mb_8">
            Your progress: {course.progressPercent}%
          </p>
        )}
        {course.excerpt ? (
          <p className="text-body-1 line-clamp-2">{course.excerpt}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
