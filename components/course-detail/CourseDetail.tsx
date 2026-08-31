import type { Course } from "@/types/course";
import CourseDetailHero from "@/components/course-detail/CourseDetailHero";
import CourseDetailPreviewSection from "@/components/course-detail/CourseDetailPreviewSection";
import CourseDetailAboutSection from "@/components/course-detail/CourseDetailAboutSection";

type CourseDetailProps = {
  course: Course;
};

export default function CourseDetail({ course }: CourseDetailProps) {
  return (
    <div className="course-detail">
      <CourseDetailHero course={course} />
      <CourseDetailPreviewSection course={course} />
      <CourseDetailAboutSection course={course} />
    </div>
  );
}
