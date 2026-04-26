import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import AiTools from "@/components/homes/home-2/AiTools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompts || Handiz",
  description: "Browse AI prompts for architecture and design workflows.",
};

export default function AiPromptsPage() {
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
