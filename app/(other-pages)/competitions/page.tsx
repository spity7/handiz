import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import EditorsPicCompetition from "@/components/homes/home-1/EditorsPicCompetition";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitions || Handiz",
  description: "Handiz",
};

export default function Page() {
  return (
    <>
      <Header1 />
      <div className="main-content">
        <EditorsPicCompetition />
      </div>
      <Footer1 />
    </>
  );
}
