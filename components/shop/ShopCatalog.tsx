"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ShopCategory, ShopProduct } from "@/types/shop";
import { fetchShopProducts } from "@/lib/shop";
import ProductCard from "./ProductCard";

export default function ShopCatalog({
  initialProducts,
  initialPagination,
  categories,
  shippingFee,
}: {
  initialProducts: ShopProduct[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  categories: ShopCategory[];
  shippingFee: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || "1");

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchShopProducts({
      page,
      limit: 12,
      q: q || undefined,
      category: category || undefined,
      sort,
    });
    setProducts(data.products);
    if (data.pagination) setPagination(data.pagination);
    setLoading(false);
  }, [page, q, category, sort]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateParams = (patch: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    router.push(`/shop/products?${next.toString()}`);
  };

  return (
    <section className="shop-catalog tf-container tf-spacing-1">
      <header className="shop-catalog__header">
        <h1 className="shop-catalog__title">Shop</h1>
        <p className="shop-catalog__lead text-muted">
          Architecture resources and Handiz merchandise. Shipping from $
          {shippingFee.toFixed(2)}.
        </p>
      </header>

      <div className="shop-catalog__toolbar">
        <input
          type="search"
          className="form-control shop-catalog__search"
          placeholder="Search products…"
          value={q}
          onChange={(e) => updateParams({ q: e.target.value, page: "1" })}
        />
        <select
          className="form-select shop-catalog__sort"
          value={category}
          onChange={(e) =>
            updateParams({ category: e.target.value, page: "1" })
          }
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          className="form-select shop-catalog__sort"
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value, page: "1" })}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </div>

      {loading ? (
        <p className="shop-catalog__loading">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="shop-catalog__empty">No products match your filters.</p>
      ) : (
        <div className="tf-grid-layout xxl-col-4 sm-col-2 shop-catalog__grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <nav className="shop-catalog__pagination" aria-label="Product pages">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                type="button"
                className={`shop-catalog__page-btn${p === pagination.page ? " is-active" : ""}`}
                onClick={() => updateParams({ page: String(p) })}
              >
                {p}
              </button>
            ),
          )}
        </nav>
      )}
    </section>
  );
}
