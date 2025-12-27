import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Header2 from "@/components/headers/Header2";
import Categories from "@/components/homes/home-2/Categories";
import Cta from "@/components/homes/home-2/Cta";
import Hero from "@/components/homes/home-2/Hero";
import HeroSP from "@/components/homes/home-2/HeroSP";
import HighlightPosts from "@/components/homes/home-2/HighlightPosts";
import InstagramPosts from "@/components/homes/home-2/InstagramPosts";
import LatestPosts from "@/components/homes/home-2/LatestPosts";
import PopularBlogs from "@/components/homes/home-1/PopularBlogs";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Student Project || Handiz",
  description: "Student Project",
};
export default function page() {
  return (
    <>
      {/* <Header2 /> */}
      <Header1 />
      {/* <Hero /> */}
      <HeroSP />
      <div className="main-content">
        <PopularBlogs />
        {/* <Categories />
        <Cta />
        <LatestPosts />
        <HighlightPosts />
        <InstagramPosts /> */}
      </div>
      <Footer1 type={2} parentClass="tf-container w-xxl tf-spacing-8 pt-0" />
    </>
  );
}
