import Link from "next/link";
import type { ShopProduct } from "@/types/shop";
import ProductCard from "./ProductCard";

export default function ShopHero({ featured }: { featured: ShopProduct[] }) {
  return (
    <section className="shop-hero tf-container tf-spacing-1">
      <div className="shop-hero__inner">
        <div className="shop-hero__copy">
          <p className="shop-hero__eyebrow">Handiz Shop</p>
          <h1 className="shop-hero__title">
            Tools &amp; materials for architecture students
          </h1>
          <p className="shop-hero__text">
            Curated products to support your studio work—shipped across Lebanon
            with secure online checkout.
          </p>
          <div className="shop-hero__actions">
            <Link href="/shop/products" className="tf-btn animate-hover-btn">
              Browse catalog
            </Link>
            <Link
              href="/shop/cart"
              className="tf-btn style-2 animate-hover-btn"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
      {featured.length > 0 && (
        <div className="shop-hero__featured">
          <h2 className="shop-hero__featured-title">Featured</h2>
          <div className="tf-grid-layout xxl-col-3 sm-col-2 shop-hero__grid">
            {featured.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
