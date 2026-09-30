"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ShopCategory, ShopProduct } from "@/types/shop";

import { fetchShopProducts } from "@/lib/shop";

import ProductCard from "./ProductCard";

import ShopCatalogEmpty from "./ShopCatalogEmpty";

import ShopCatalogFilters from "./ShopCatalogFilters";

const SEARCH_DEBOUNCE_MS = 350;

export default function ShopCatalog({
  initialProducts,

  initialPagination,

  categories,
}: {
  initialProducts: ShopProduct[];

  initialPagination: {
    page: number;

    limit: number;

    total: number;

    pages: number;
  };

  categories: ShopCategory[];
}) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [products, setProducts] = useState(initialProducts);

  const [pagination, setPagination] = useState(initialPagination);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || "",
  );

  const q = searchParams.get("q") || "";

  const category = searchParams.get("category") || "";

  const sort = searchParams.get("sort") || "newest";

  const page = Number(searchParams.get("page") || "1");

  const searchFocusedRef = useRef(false);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (searchFocusedRef.current) return;

    setSearchQuery(q);
  }, [q]);

  useEffect(
    () => () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

      fetchAbortRef.current?.abort();
    },

    [],
  );

  const updateParams = useCallback(
    (patch: Record<string, string>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(patch).forEach(([k, v]) => {
        if (!v) next.delete(k);
        else next.set(k, v);
      });

      const qs = next.toString();

      router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
    },

    [router, searchParams],
  );

  const commitSearch = useCallback(
    (value: string) => {
      const next = value.trim();

      if (next === q.trim()) return;

      updateParams({ q: next, page: "1" });
    },

    [q, updateParams],
  );

  const refresh = useCallback(async () => {
    fetchAbortRef.current?.abort();

    const controller = new AbortController();

    fetchAbortRef.current = controller;

    setIsRefreshing(true);

    try {
      const data = await fetchShopProducts(
        {
          page,

          limit: 12,

          q: q || undefined,

          category: category || undefined,

          sort,
        },

        { signal: controller.signal },
      );

      if (controller.signal.aborted) return;

      setProducts(data.products);

      if (data.pagination) setPagination(data.pagination);
    } catch {
      if (controller.signal.aborted) return;
    } finally {
      if (!controller.signal.aborted) setIsRefreshing(false);
    }
  }, [page, q, category, sort]);

  const paramsKey = JSON.stringify([page, q, category, sort]);

  const loadedParamsKey = useRef(paramsKey);

  useEffect(() => {
    if (paramsKey === loadedParamsKey.current) return;

    loadedParamsKey.current = paramsKey;

    refresh();
  }, [paramsKey, refresh]);

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);

    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    searchDebounceRef.current = setTimeout(() => {
      commitSearch(value);
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleSearchSubmit = () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    commitSearch(searchQuery);
  };

  const handleSearchClear = () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    setSearchQuery("");

    if (q) updateParams({ q: "", page: "1" });
  };

  const hasActiveFilters = Boolean(q || category || sort !== "newest");

  const clearFilters = () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    setSearchQuery("");

    updateParams({ q: "", category: "", sort: "newest", page: "1" });
  };

  const gridClassName =
    "tf-grid-layout md-col-2 lg-col-3 xl-col-4 gap30 shop-catalog__grid";

  const showEmpty = !isRefreshing && products.length === 0;

  return (
    <section className="shop-catalog tf-container w-xxl tf-spacing-1">
      <header className="shop-catalog__header">
        <div className="shop-catalog__intro">
          <h1 className="shop-catalog__eyebrow">
            <i
              className="bi bi-bag shop-catalog__eyebrow-icon"
              aria-hidden="true"
            />
            Handiz Shop
          </h1>
        </div>
      </header>

      <ShopCatalogFilters
        categories={categories}
        searchQuery={searchQuery}
        categorySlug={category}
        sort={sort}
        hasActiveFilters={hasActiveFilters}
        onSearchQueryChange={handleSearchQueryChange}
        onSearchSubmit={handleSearchSubmit}
        onSearchClear={handleSearchClear}
        onSearchFocus={() => {
          searchFocusedRef.current = true;
        }}
        onSearchBlur={() => {
          searchFocusedRef.current = false;
        }}
        onCategoryChange={(slug) => updateParams({ category: slug, page: "1" })}
        onSortChange={(nextSort) => updateParams({ sort: nextSort, page: "1" })}
        onClearFilters={clearFilters}
      />

      {products.length > 0 && (
        <p
          className={`shop-catalog__results${isRefreshing ? " is-refreshing" : ""}`}
          aria-live="polite"
        >
          <span className="shop-catalog__results-primary">
            <span className="shop-catalog__results-muted">Showing</span>{" "}
            <strong className="shop-catalog__results-emphasis">
              {products.length}
            </strong>{" "}
            <span className="shop-catalog__results-muted">of</span>{" "}
            <strong className="shop-catalog__results-emphasis">
              {pagination.total}
            </strong>{" "}
            <span className="shop-catalog__results-muted">
              {pagination.total === 1 ? "product" : "products"}
            </span>
          </span>
          {pagination.pages > 1 && (
            <span className="shop-catalog__results-secondary">
              Page{" "}
              <strong className="shop-catalog__results-emphasis">
                {pagination.page}
              </strong>{" "}
              <span className="shop-catalog__results-muted">of</span>{" "}
              <strong className="shop-catalog__results-emphasis">
                {pagination.pages}
              </strong>
            </span>
          )}
          {isRefreshing && (
            <span className="shop-catalog__results-status">Updating…</span>
          )}
        </p>
      )}

      {showEmpty ? (
        <ShopCatalogEmpty
          filtered={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      ) : (
        <div
          className={`${gridClassName}${isRefreshing ? " shop-catalog__grid--refreshing" : ""}`}
          aria-busy={isRefreshing}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <nav
          className={`shop-catalog__pagination${isRefreshing ? " is-refreshing" : ""}`}
          aria-label="Product pages"
        >
          <button
            type="button"
            className="shop-catalog__page-btn shop-catalog__page-btn--nav"
            disabled={isRefreshing || pagination.page <= 1}
            onClick={() =>
              updateParams({ page: String(Math.max(1, pagination.page - 1)) })
            }
          >
            Previous
          </button>

          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                type="button"
                className={`shop-catalog__page-btn${p === pagination.page ? " is-active" : ""}`}
                onClick={() => updateParams({ page: String(p) })}
                disabled={isRefreshing}
                aria-current={p === pagination.page ? "page" : undefined}
              >
                {p}
              </button>
            ),
          )}

          <button
            type="button"
            className="shop-catalog__page-btn shop-catalog__page-btn--nav"
            disabled={isRefreshing || pagination.page >= pagination.pages}
            onClick={() =>
              updateParams({
                page: String(Math.min(pagination.pages, pagination.page + 1)),
              })
            }
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}
