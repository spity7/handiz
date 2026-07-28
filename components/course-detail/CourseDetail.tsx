import type { Course, Lesson } from "@/types/course";
import CourseDetailHero from "@/components/course-detail/CourseDetailHero";
import CourseDetailPreviewSection from "@/components/course-detail/CourseDetailPreviewSection";
import CourseDetailAboutSection from "@/components/course-detail/CourseDetailAboutSection";

type CourseDetailProps = {
  course: Course;
  previewLesson?: Lesson | null;
};

export default function CourseDetail({
  course,
  previewLesson = null,
}: CourseDetailProps) {
  return (
    <div className="course-detail">
      <CourseDetailHero course={course} previewLesson={previewLesson} />
      <CourseDetailPreviewSection course={course} />
      <CourseDetailAboutSection course={course} />
    </div>
  );
}
