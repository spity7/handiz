"use client";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import HeroSP from "@/components/homes/home-2/HeroSP";
import HomepageAdsBar from "@/components/homes/home-2/HomepageAdsBar";
import StudentProjects from "@/components/homes/home-1/StudentProjects";
import HomePageSkeleton from "@/components/skeletons/HomePageSkeleton";
import { useHomeProjectFilters } from "@/components/providers/HomeProjectFiltersProvider";
import { Suspense } from "react";

function PageContent() {
  const {
    selectedCategories,
    selectedConcepts,
    selectedTypes,
    searchQuery,
    setSearchQuery,
  } = useHomeProjectFilters();

  return (
    <>
      <Header1 />
      <HomepageAdsBar />
      <HeroSP searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="main-content">
        <StudentProjects
          selectedCategories={selectedCategories}
          selectedConcepts={selectedConcepts}
          selectedTypes={selectedTypes}
          searchQuery={searchQuery}
        />
      </div>
      <Footer1 />
    </>
  );
}

export default function page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}
