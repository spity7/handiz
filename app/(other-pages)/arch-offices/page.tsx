import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ArchOfficesListing from "@/components/offices/ArchOfficesListing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arch Offices || Handiz",
  description: "Architecture studios hiring on Handiz.",
};

export default function Page() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <ArchOfficesListing />
      </div>
      <Footer1 />
    </>
  );
}
