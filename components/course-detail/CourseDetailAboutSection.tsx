import type { Course } from "@/types/course";
import { getCourseAboutSections } from "@/lib/courseAboutSections";
import { hasInstructorPublicProfile } from "@/lib/instructorDisplay";
import CourseDetailAboutCourseAccordion from "@/components/course-detail/CourseDetailAboutCourseAccordion";
import CourseDetailAuthorAside from "@/components/course-detail/CourseDetailAuthorAside";

type CourseDetailAboutSectionProps = {
  course: Course;
};

export default function CourseDetailAboutSection({
  course,
}: CourseDetailAboutSectionProps) {
  const instructor =
    course.instructorId && typeof course.instructorId === "object"
      ? course.instructorId
      : null;
  const aboutSections = getCourseAboutSections(course.aboutCourseSections);
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
            </header>
            <CourseDetailAboutCourseAccordion
              sections={aboutSections}
              slug={course.slug}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
