import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import LatestPostsCourses from "@/components/homes/home-1/LatestPostsCourses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses || Handiz",
  description: "Handiz",
};

export default function Page() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <LatestPostsCourses />
      </div>
      <Footer1 />
    </>
  );
}
