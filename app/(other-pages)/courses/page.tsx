import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import CoursesCatalog from "@/components/courses/CoursesCatalog";
import { fetchCourses } from "@/lib/courses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Handiz Architecture Academy",
  description:
    "Learn architecture software and design skills with Handiz video courses — D5 Render, Rhino, Grasshopper, and more.",
};

export default async function Page() {
  const courses = await fetchCourses();

  return (
    <>
      <Header1 />
      <div className="main-content">
        <CoursesCatalog courses={courses} />
      </div>
      <Footer1 />
    </>
  );
}
