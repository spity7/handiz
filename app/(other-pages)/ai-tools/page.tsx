import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import AiTools from "@/components/homes/home-2/AiTools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ai Tools || Handiz",
  description: "Handiz",
};

export default function Page() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <AiTools />
      </div>
      <Footer1 />
    </>
  );
}
