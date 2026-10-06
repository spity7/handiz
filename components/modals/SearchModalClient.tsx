"use client";

import dynamic from "next/dynamic";

const SearchModal = dynamic(() => import("@/components/modals/SearchModal"), {
  ssr: false,
});

export default function SearchModalClient() {
  return <SearchModal />;
}
