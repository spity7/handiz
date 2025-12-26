import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import SidebarMenu from "@/components/headers/SidebarMenu";
import About from "@/components/homes/home-3/About";
import Categories from "@/components/homes/home-3/Categories";
import EditorsPic from "@/components/homes/home-3/EditorsPic";
import Hero from "@/components/homes/home-3/Hero";
import HighlightBlogs from "@/components/homes/home-3/HighlightBlogs";
import HirePopup from "@/components/homes/home-3/HirePopup";
import InstagramPosts from "@/components/homes/home-3/InstagramPosts";
import LatestBlogs from "@/components/homes/home-3/LatestBlogs";
import PopularBlogs from "@/components/homes/home-3/PopularBlogs";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home 03 || Drozy - Modern Blog & Magazine React Nextjs Template",
  description: "Drozy - Modern Blog & Magazine React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="main-content style-1">
        <div className="wrap-main-blog position-relative section-onepage">
          <SidebarMenu />
          <div className="content-inner">
            <Header3 />
            <About />
            <Hero />
            <div id="blog" className="section">
              <LatestBlogs />
              <Categories />
              <EditorsPic />
              <PopularBlogs />
              <HighlightBlogs />
            </div>
            <InstagramPosts />
            <Footer1
              parentClass="tf-container w-xl tf-spacing-8 pt-0 page-3"
              type={3}
            />
          </div>
        </div>
      </div>
      <HirePopup />
    </>
  );
}
