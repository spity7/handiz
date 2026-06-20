import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import OfficesGridSkeleton from "@/components/skeletons/OfficesGridSkeleton";

export default function Loading() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <OfficesGridSkeleton />
      </div>
      <Footer1 />
    </>
  );
}
