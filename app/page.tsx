import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Cta from "@/components/homes/home-1/Cta";
import EditorsPic from "@/components/homes/home-1/EditorsPic";
import Hero from "@/components/homes/home-1/Hero";
import HighlightPosts from "@/components/homes/home-1/HighlightPosts";
import LatestPosts from "@/components/homes/home-1/LatestPosts";
import PopularBlogs from "@/components/homes/home-1/PopularBlogs";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home || Drozy - Modern Blog & Magazine React Nextjs Template",
  description: "Drozy - Modern Blog & Magazine React Nextjs Template",
};
export default function Home() {
  return (
    <>
      <Header1 />
      <Hero />
      <div className="main-content">
        <PopularBlogs />
        <EditorsPic />
        <LatestPosts />
        <HighlightPosts />
        <Cta />
      </div>
      <Footer1 />
    </>
  );
}
