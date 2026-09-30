"use client";

import { type FormEvent, type JSX, type ReactNode } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import type { ShopCategory } from "@/types/shop";

import {
  SortNewestIcon,
  SortPriceAscIcon,
  SortPriceDescIcon,
} from "./ShopSortIcons";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest", Icon: SortNewestIcon },

  { value: "price_asc", label: "Price: low to high", Icon: SortPriceAscIcon },

  { value: "price_desc", label: "Price: high to low", Icon: SortPriceDescIcon },
] as const;

type ShopCatalogFiltersProps = {
  categories: ShopCategory[];

  searchQuery: string;

  categorySlug: string;

  sort: string;

  onSearchQueryChange: (query: string) => void;

  onSearchSubmit: () => void;

  onSearchClear: () => void;

  onSearchFocus: () => void;

  onSearchBlur: () => void;

  onCategoryChange: (slug: string) => void;

  onSortChange: (sort: string) => void;

  onClearFilters: () => void;

  hasActiveFilters: boolean;
};

function FilterChip({
  active,

  onClick,

  children,

  className = "",
}: {
  active: boolean;

  onClick: () => void;

  children: ReactNode;

  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tag h6 shop-filter-chip${active ? " is-active" : ""} ${className}`.trim()}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function ClearFiltersButton({
  placement,

  onClick,
}: {
  placement: "sort-row" | "categories-row";

  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`shop-catalog__clear-filters shop-catalog__clear-filters--${placement}`}
      onClick={onClick}
      aria-label="Clear filters"
    >
      <i className="icon-X" aria-hidden="true" />

      <span className="shop-catalog__clear-text">Clear</span>

      {placement === "categories-row" && (
        <span className="shop-catalog__clear-text-suffix"> filters</span>
      )}
    </button>
  );
}

function SortChip({
  active,

  onClick,

  label,

  Icon,
}: {
  active: boolean;

  onClick: () => void;

  label: string;

  Icon: (props: { className?: string }) => JSX.Element;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shop-sort-chip${active ? " is-active" : ""}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
    >
      <Icon />
    </button>
  );
}

export default function ShopCatalogFilters({
  categories,

  searchQuery,

  categorySlug,

  sort,

  onSearchQueryChange,

  onSearchSubmit,

  onSearchClear,

  onSearchFocus,

  onSearchBlur,

  onCategoryChange,

  onSortChange,

  onClearFilters,

  hasActiveFilters,
}: ShopCatalogFiltersProps) {
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();

    onSearchSubmit();
  };

  const toggleCategory = (slug: string) => {
    onCategoryChange(categorySlug === slug ? "" : slug);
  };

  return (
    <div className="shop-catalog__filters page-title homepage-2 sw-layout">
      <div className="shop-catalog__filters-inner">
        <div className="shop-catalog__top-row">
          <div className="shop-catalog__search-row">
            <form
              action="#"
              className="form-search shop-catalog__form-search"
              onSubmit={submitSearch}
            >
              <fieldset className="input-search shop-catalog__input-search">
                <input
                  type="text"
                  name="shop-search"
                  id="shop-search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  onFocus={onSearchFocus}
                  onBlur={onSearchBlur}
                  autoComplete="off"
                  aria-label="Search products"
                />

                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    className="shop-catalog__search-clear"
                    onClick={onSearchClear}
                    aria-label="Clear search"
                  >
                    <i className="icon-X" aria-hidden="true" />
                  </button>
                )}
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
          </div>

          <div className="shop-catalog__sort-band">
            <span className="shop-catalog__sort-label" id="shop-sort-label">
              Sort:
            </span>

            <div
              className="shop-catalog__sort-group"
              role="group"
              aria-labelledby="shop-sort-label"
            >
              {SORT_OPTIONS.map((option) => (
                <SortChip
                  key={option.value}
                  active={sort === option.value}
                  label={option.label}
                  Icon={option.Icon}
                  onClick={() => onSortChange(option.value)}
                />
              ))}
            </div>

            {hasActiveFilters && (
              <ClearFiltersButton
                placement="sort-row"
                onClick={onClearFilters}
              />
            )}
          </div>
        </div>

        <div className="shop-catalog__categories-row">
          <div className="shop-catalog__categories-track">
            <Swiper
              className="swiper sw-layout wrap-tag-categories style-1 shop-catalog__categories"
              spaceBetween={12}
              slidesPerView="auto"
              modules={[Navigation]}
              navigation={{
                prevEl: ".shop-catalog-snbp",

                nextEl: ".shop-catalog-snbn",
              }}
            >
              <div className="sw-button style-cycle text_primary-color nav-prev-layout shop-catalog-snbp">
                <i className="icon-CaretLeft" />
              </div>

              <SwiperSlide className="swiper-slide">
                <FilterChip
                  active={!categorySlug}
                  onClick={() => onCategoryChange("")}
                >
                  All products
                </FilterChip>
              </SwiperSlide>

              {categories.map((cat) => (
                <SwiperSlide className="swiper-slide" key={cat._id}>
                  <FilterChip
                    active={categorySlug === cat.slug}
                    onClick={() => toggleCategory(cat.slug)}
                  >
                    {cat.name}
                  </FilterChip>
                </SwiperSlide>
              ))}

              <div className="sw-button style-cycle text_primary-color nav-next-layout shop-catalog-snbn">
                <i className="icon-CaretRight" />
              </div>
            </Swiper>
          </div>

          {hasActiveFilters && (
            <ClearFiltersButton
              placement="categories-row"
              onClick={onClearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
