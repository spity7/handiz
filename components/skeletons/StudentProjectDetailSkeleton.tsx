import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

export default function StudentProjectDetailSkeleton() {
  return (
    <>
      <Header1 />

      <div className="bg-surface2-color">
        <div className="tf-container student-project-detail-skeleton">
          <span className="skeleton-block student-project-detail-skeleton__breadcrumb" />
        </div>
      </div>

      <div className="heading-post">
        <div className="tf-container student-project-detail-skeleton">
          <div className="content text-center">
            <span className="skeleton-block student-project-detail-skeleton__tag d-block" />
            <span className="skeleton-block student-project-detail-skeleton__meta d-block" />
            <span className="skeleton-block student-project-detail-skeleton__heading d-block" />

            <div className="user-post d-flex align-items-center justify-content-center gap_20">
              <span className="skeleton-block student-project-detail-skeleton__avatar" />
              <span className="skeleton-block student-project-detail-skeleton__author" />
            </div>
          </div>

          <span className="skeleton-block student-project-detail-skeleton__hero d-block" />
        </div>
      </div>

      <div className="main-content">
        <div className="single-post">
          <div className="tf-container">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-6">
                <div className="post-details student-project-detail-skeleton">
                  {Array.from({ length: 7 }, (_, index) => (
                    <span
                      key={index}
                      className="skeleton-block student-project-detail-skeleton__sidebar-line d-block"
                      style={{ width: `${88 - (index % 3) * 8}%` }}
                    />
                  ))}
                  {Array.from({ length: 8 }, (_, index) => (
                    <span
                      key={`paragraph-${index}`}
                      className="skeleton-block student-project-detail-skeleton__paragraph d-block"
                      style={{ width: `${100 - (index % 4) * 6}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer1 parentClass="tf-container" />
    </>
  );
}
