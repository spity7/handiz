import CourseCard1 from "@/components/courses/CourseCard1";
import { fetchCourses } from "@/lib/courses";
import Link from "next/link";

export default async function LatestPostsCourses() {
  const courses = await fetchCourses();
  const featured = courses.slice(0, 3);

  return (
    <div className="tf-container tf-spacing-1">
      <div className="heading-section mb_28 d-flex justify-content-between align-items-center">
        <h3 className="title mb-0">Courses</h3>
        {courses.length > 3 && (
          <Link href="/courses" className="link text-body-1">
            View all courses →
          </Link>
        )}
      </div>
      {featured.length === 0 ? (
        <p className="text-muted">New courses coming soon.</p>
      ) : (
        <div className="tf-grid-layout xxl-col-3 sm-col-2">
          {featured.map((course) => (
            <CourseCard1 key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
