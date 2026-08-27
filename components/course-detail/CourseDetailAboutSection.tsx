import type { Course } from "@/types/course";
import { getCourseAboutSections } from "@/lib/courseAboutSections";
import { hasInstructorPublicProfile } from "@/lib/instructorDisplay";
import CourseDetailAboutCourseAccordion from "@/components/course-detail/CourseDetailAboutCourseAccordion";
import CourseDetailAuthorAside from "@/components/course-detail/CourseDetailAuthorAside";
import CourseDetailEnrollCard from "@/components/course-detail/CourseDetailEnrollCard";

type CourseDetailAboutSectionProps = {
  course: Course;
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getCourseAboutDescription(course: Course) {
  return (
    stripHtml(course.description || "") ||
    course.excerpt?.trim() ||
    "Get full access to every lesson, resource, and update in this course."
  );
}

export default function CourseDetailAboutSection({
  course,
}: CourseDetailAboutSectionProps) {
  const instructor =
    course.instructorId && typeof course.instructorId === "object"
      ? course.instructorId
      : null;
  const aboutSections = getCourseAboutSections(course.aboutCourseSections);
  const aboutDescription = getCourseAboutDescription(course);
  const showAuthor = instructor && hasInstructorPublicProfile(instructor);
  const showAboutCourse = aboutSections.length > 0;

  if (!showAuthor && !showAboutCourse) {
    return null;
  }

  return (
    <section
      className="course-detail-about tf-container tf-spacing-1"
      aria-label="About the course and instructor"
    >
      <div className="course-detail-about__layout">
        {showAuthor && instructor ? (
          <CourseDetailAuthorAside instructor={instructor} />
        ) : null}

        {showAboutCourse ? (
          <div className="course-detail-about__main">
            <header className="heading-section course-detail-about__header">
              <h3 className="title">About the course</h3>
              <p className="course-detail-about__description">
                {aboutDescription}
              </p>
            </header>
            <CourseDetailAboutCourseAccordion
              sections={aboutSections}
              slug={course.slug}
            />
            <CourseDetailEnrollCard course={course} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
