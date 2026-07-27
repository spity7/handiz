import type { Course } from "@/types/course";
import CourseDetailMarketingVideoCard from "@/components/course-detail/CourseDetailMarketingVideoCard";
import { getCourseMarketingVideos } from "@/lib/courseMarketingVideos";
import { getPublicPriceDisplay } from "@/lib/coursePricing";
import { getLmsUrl } from "@/lib/lms";

type CourseDetailPreviewSectionProps = {
  course: Course;
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CourseDetailPreviewSection({
  course,
}: CourseDetailPreviewSectionProps) {
  const marketingVideos = getCourseMarketingVideos(course.marketingVideos, 3);
  const description =
    stripHtml(course.description || "") ||
    course.excerpt?.trim() ||
    "Explore step-by-step video lessons designed to help you master professional architecture workflows.";
  const priceDisplay = getPublicPriceDisplay(course.pricing);
  const enrollHref = getLmsUrl(`/courses/${course.slug}`);
  const enrollLabel = priceDisplay.isFree ? "Enroll for Free" : "Enroll Now";

  if (marketingVideos.length === 0 && !description) {
    return null;
  }

  return (
    <section
      className="course-detail-preview tf-container tf-spacing-1"
      aria-labelledby="course-preview-heading"
    >
      <header className="heading-section mb_28">
        <h3 id="course-preview-heading" className="title">
          Inside the Course
        </h3>
      </header>

      <div className="tf-grid-layout xxl-col-4 sm-col-2 course-detail-preview__grid">
        {marketingVideos.map((video, index) => (
          <CourseDetailMarketingVideoCard
            key={`${video.order}-${video.url}`}
            video={video}
            videoIndex={index}
            fallbackThumbnail={course.thumbnailUrl}
          />
        ))}

        <aside className="newsletter-item course-detail-preview__aside course-detail-preview__grid-cell d-flex flex-column justify-content-between">
          <div className="course-detail-preview__aside-body">
            <h4 className="course-detail-preview__aside-title">
              {course.title}
            </h4>
            <div className="course-detail-preview__description-slot">
              <p className="text-body-1 course-detail-preview__description">
                {description}
              </p>
            </div>
          </div>
          <a
            href={enrollHref}
            target="_blank"
            rel="noopener noreferrer"
            className="course-detail-preview__cta tf-btn btn-fill animate-hover-btn btn-switch-text"
          >
            <span>
              <span className="btn-double-text" data-text={enrollLabel}>
                {enrollLabel}
              </span>
            </span>
          </a>
        </aside>
      </div>
    </section>
  );
}
