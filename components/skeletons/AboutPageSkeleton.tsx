import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export default function AboutPageSkeleton() {
  return (
    <>
      <Header1 />
      <div className="bg-surface2-color">
        <div className="tf-container about-page-skeleton">
          <span className="skeleton-block about-page-skeleton__breadcrumb d-block" />
        </div>
      </div>
      <div className="page-title style-1 pb-0 pt-0">
        <div className="tf-container text-center">
          <span className="skeleton-block about-page-skeleton__heading d-inline-block" />
        </div>
      </div>
      <div className="main-content single-post">
        <div className="tf-container tf-spacing-2 pt-0">
          <div className="row">
            <div className="col-lg-2" />
            <div className="col-lg-9 placeholder-glow">
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  key={index}
                  className="skeleton-block about-page-skeleton__paragraph d-block mb-3"
                  style={{ width: `${100 - (index % 4) * 7}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
