"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function parseListParam(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

type HomeProjectFiltersContextValue = {
  selectedCategories: string[];
  selectedConcepts: string[];
  selectedTypes: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleCategory: (value: string) => void;
  toggleConcept: (value: string) => void;
  toggleType: (value: string) => void;
  clearAllFilters: () => void;
  totalSelectedFilters: number;
};

const HomeProjectFiltersContext =
  createContext<HomeProjectFiltersContextValue | null>(null);

export function HomeProjectFiltersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
    setSelectedCategories(parseListParam(searchParams.get("categories")));
    setSelectedConcepts(parseListParam(searchParams.get("concepts")));
    setSelectedTypes(parseListParam(searchParams.get("types")));
  }, [searchParams]);

  const replaceParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const toggleListParam = useCallback(
    (key: "categories" | "concepts" | "types", value: string) => {
      replaceParams((params) => {
        const current = parseListParam(params.get(key));
        const next = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        if (next.length > 0) {
          params.set(key, next.join(","));
        } else {
          params.delete(key);
        }
      });
    },
    [replaceParams],
  );

  const toggleCategory = useCallback(
    (value: string) => toggleListParam("categories", value),
    [toggleListParam],
  );

  const toggleConcept = useCallback(
    (value: string) => toggleListParam("concepts", value),
    [toggleListParam],
  );

  const toggleType = useCallback(
    (value: string) => toggleListParam("types", value),
    [toggleListParam],
  );

  const clearAllFilters = useCallback(() => {
    replaceParams((params) => {
      params.delete("categories");
      params.delete("concepts");
      params.delete("types");
    });
  }, [replaceParams]);

  const totalSelectedFilters = useMemo(
    () =>
      selectedCategories.length +
      selectedConcepts.length +
      selectedTypes.length,
    [selectedCategories.length, selectedConcepts.length, selectedTypes.length],
  );

  const value = useMemo(
    () => ({
      selectedCategories,
      selectedConcepts,
      selectedTypes,
      searchQuery,
      setSearchQuery,
      toggleCategory,
      toggleConcept,
      toggleType,
      clearAllFilters,
      totalSelectedFilters,
    }),
    [
      selectedCategories,
      selectedConcepts,
      selectedTypes,
      searchQuery,
      toggleCategory,
      toggleConcept,
      toggleType,
      clearAllFilters,
      totalSelectedFilters,
    ],
  );

  return (
    <HomeProjectFiltersContext.Provider value={value}>
      {children}
    </HomeProjectFiltersContext.Provider>
  );
}

export function useHomeProjectFilters() {
  const context = useContext(HomeProjectFiltersContext);
  if (!context) {
    throw new Error(
      "useHomeProjectFilters must be used within HomeProjectFiltersProvider",
    );
  }
  return context;
}
