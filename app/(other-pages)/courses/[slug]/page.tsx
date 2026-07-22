import CourseDetail from "@/components/course-detail/CourseDetail";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { fetchCourseBySlug, getPreviewLesson } from "@/lib/courses";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchCourseBySlug(slug);

  if (!data) {
    return {
      title: "Course Not Found | Handiz Architecture Academy",
    };
  }

  const { course } = data;
  const heroImage =
    course.heroImageDesktopUrl || course.thumbnailUrl || undefined;

  return {
    title: `${course.title} | Handiz Architecture Academy`,
    description:
      course.excerpt ||
      "Learn architecture software and design skills with Handiz video courses.",
    openGraph: {
      title: course.title,
      description: course.excerpt,
      url: `/courses/${slug}`,
      images: heroImage ? [heroImage] : [],
    },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchCourseBySlug(slug);

  if (!data) notFound();

  const previewLesson = getPreviewLesson(data.curriculum);

  return (
    <>
      <Header1 />
      <div className="main-content">
        <CourseDetail course={data.course} previewLesson={previewLesson} />
      </div>
      <Footer1 />
    </>
  );
}
