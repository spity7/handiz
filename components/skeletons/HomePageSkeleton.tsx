import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ProjectCategoriesSkeleton from "./ProjectCategoriesSkeleton";
import StudentProjectsGridSkeleton from "./StudentProjectsGridSkeleton";

export default function HomePageSkeleton() {
  return (
    <>
      <Header1 />

      <div className="page-title homepage-2 sw-layout">
        <div className="tf-container w-xxl home-page-skeleton">
          <span className="skeleton-block home-page-skeleton__search d-block" />
          <ProjectCategoriesSkeleton />
        </div>
      </div>

      <div className="main-content">
        <div
          className="section-most-popular tf-spacing-1"
          style={{ paddingTop: "0px" }}
        >
          <div className="tf-container sw-layout">
            <div className="heading-section d-flex justify-content-between mb_28">
              <h3>Student Projects</h3>
            </div>
            <StudentProjectsGridSkeleton />
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
}
