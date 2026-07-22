import CourseDetailSkeleton from "@/components/course-detail/CourseDetailSkeleton";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export default function Loading() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <CourseDetailSkeleton />
      </div>
      <Footer1 />
    </>
  );
}
