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
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PageContent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }

    const categories = searchParams.get("categories");
    if (categories) {
      setSelectedCategories(categories.split(","));
    } else {
      setSelectedCategories([]);
    }

    const concepts = searchParams.get("concepts");
    if (concepts) {
      setSelectedConcepts(concepts.split(","));
    } else {
      setSelectedConcepts([]);
    }

    const types = searchParams.get("types");
    if (types) {
      setSelectedTypes(types.split(","));
    } else {
      setSelectedTypes([]);
    }
  }, [searchParams]);

  return (
    <>
      {/* <Header2 /> */}
      <Header1 />
      {/* <Hero /> */}
      <HeroSP
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
        }}
      />
      <div className="main-content">
        {/* <PopularBlogs /> */}
        <StudentProjects
          selectedCategories={selectedCategories}
          selectedConcepts={selectedConcepts}
          selectedTypes={selectedTypes}
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

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
