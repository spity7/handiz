"use client";

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
import StudentProjects from "@/components/homes/home-1/StudentProjects";
import { useState } from "react";

export default function page() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* <Header2 /> */}
      <Header1 />
      {/* <Hero /> */}
      <HeroSP
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="main-content">
        {/* <PopularBlogs /> */}
        <StudentProjects
          selectedCategories={selectedCategories}
          searchQuery={searchQuery}
        />
        {/* <Categories />
        <Cta />
        <LatestPosts />
        <HighlightPosts />
        <InstagramPosts /> */}
      </div>
      <Footer1 />
    </>
  );
}
