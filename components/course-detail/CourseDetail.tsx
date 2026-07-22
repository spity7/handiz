import type { Course, Lesson } from "@/types/course";
import CourseDetailHero from "@/components/course-detail/CourseDetailHero";

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
    </div>
  );
}
