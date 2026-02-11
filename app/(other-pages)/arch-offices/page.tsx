import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import LatestPostsOffices from "@/components/homes/home-1/LatestPostsOffices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arch. Offices || Handiz",
  description: "Handiz",
};

async function getOffices() {
  const res = await fetch("https://api.handiz.org/api/v1/offices", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch offices");
  }
  return res.json();
}

export default async function Page() {
  const data = await getOffices();
  const offices = data.offices;

  return (
    <>
      <Header1 />
      <div className="main-content">
        <LatestPostsOffices offices={offices} />
      </div>
      <Footer1 />
    </>
  );
}
