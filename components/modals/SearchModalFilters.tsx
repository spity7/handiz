"use client";

import FilterGroup from "@/components/modals/FilterGroup";
import { useHomeProjectFilters } from "@/components/providers/HomeProjectFiltersProvider";
import { SearchFilterDropdownProvider } from "@/components/modals/searchFilterDropdownContext";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

type SearchModalFiltersProps = {
  categories: string[];
  concepts: string[];
  types: string[];
  onClose: () => void;
};

function SearchModalFilters({
  categories,
  concepts,
  types,
  onClose,
}: SearchModalFiltersProps) {
  const {
    selectedCategories,
    selectedConcepts,
    selectedTypes,
    toggleCategory,
    toggleConcept,
    toggleType,
    clearAllFilters,
    totalSelectedFilters,
    searchQuery,
  } = useHomeProjectFilters();

  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  useEffect(() => {
    const el = document.getElementById("canvasSearch");
    if (!el) return;

    const syncSearchInputFromUrl = () => {
      const input = document.getElementById(
        "search-modal-query",
      ) as HTMLInputElement | null;
      if (input) {
        input.value = searchQuery;
      }
    };

    el.addEventListener("show.bs.offcanvas", syncSearchInputFromUrl);
    return () => {
      el.removeEventListener("show.bs.offcanvas", syncSearchInputFromUrl);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (openGroupId === null) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".filter-dropdown")) return;
      setOpenGroupId(null);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroupId(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroupId]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.namedItem("search") as HTMLInputElement;

      const params = new URLSearchParams(window.location.search);
      const trimmed = input.value.trim();
      if (trimmed) {
        params.set("search", trimmed);
      } else {
        params.delete("search");
      }
      if (selectedCategories.length > 0) {
        params.set("categories", selectedCategories.join(","));
      } else {
        params.delete("categories");
      }
      if (selectedConcepts.length > 0) {
        params.set("concepts", selectedConcepts.join(","));
      } else {
        params.delete("concepts");
      }
      if (selectedTypes.length > 0) {
        params.set("types", selectedTypes.join(","));
      } else {
        params.delete("types");
      }

      onClose();
      const qs = params.toString();
      window.location.href = qs ? `/?${qs}` : "/";
    },
    [onClose, selectedCategories, selectedConcepts, selectedTypes],
  );

  const dropdownContext = useMemo(
    () => ({ openGroupId, setOpenGroupId }),
    [openGroupId],
  );

  const handleClearAll = useCallback(() => {
    clearAllFilters();
    setOpenGroupId(null);
  }, [clearAllFilters]);

  return (
    <SearchFilterDropdownProvider value={dropdownContext}>
      <div>
        <div className="wrap-form">
          <h5 className="title">What are you looking for?</h5>
          <div className="search-modal-form-row">
            <form
              action="#"
              className="form-search search-modal-form-row__search"
              onSubmit={onSubmit}
            >
              <fieldset className="input-search">
                <input
                  type="text"
                  name="search"
                  id="search-modal-query"
                  defaultValue={searchQuery}
                  placeholder="Searching...."
                />
              </fieldset>
              <div className="btn-submit">
                <button
                  type="submit"
                  className="tf-btn animate-hover-btn btn-switch-text"
                >
                  <span>
                    <span className="btn-double-text" data-text="Search">
                      Search
                    </span>
                  </span>
                </button>
              </div>
            </form>
            {totalSelectedFilters > 0 ? (
              <button
                type="button"
                className="filter-clear-all"
                onClick={handleClearAll}
                title="Clear all active filters"
                aria-label={`Reset filters, ${totalSelectedFilters} active`}
              >
                <i className="bi bi-x-lg filter-clear-all__icon" aria-hidden />
                <span className="filter-clear-all__label">Reset</span>
                <span className="filter-clear-all__count">
                  {totalSelectedFilters}
                </span>
              </button>
            ) : null}
          </div>
        </div>

        <section className="search-filters" aria-label="Filters">
          <div className="search-filters__grid">
            <FilterGroup
              groupId="categories"
              groupKind="categories"
              title="Categories"
              titleId="search-filter-categories"
              items={categories}
              selected={selectedCategories}
              onToggle={toggleCategory}
            />
            <FilterGroup
              groupId="concepts"
              groupKind="concepts"
              title="Concepts"
              titleId="search-filter-concepts"
              items={concepts}
              selected={selectedConcepts}
              onToggle={toggleConcept}
            />
            <FilterGroup
              groupId="types"
              groupKind="types"
              title="Types"
              titleId="search-filter-types"
              items={types}
              selected={selectedTypes}
              onToggle={toggleType}
            />
          </div>
        </section>
      </div>
    </SearchFilterDropdownProvider>
  );
}

export default memo(SearchModalFilters);
