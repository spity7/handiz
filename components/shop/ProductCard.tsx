import Link from "next/link";
import Image from "next/image";
import type { ShopProduct } from "@/types/shop";
import { getShopPriceDisplay } from "@/lib/shopPricing";

export default function ProductCard({ product }: { product: ShopProduct }) {
  const price = getShopPriceDisplay(product);

  return (
    <article className="shop-product-card feature-post-item style-default style-border">
      <Link
        href={`/shop/products/${product.slug}`}
        className="shop-product-card__media"
      >
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          width={400}
          height={400}
          className="shop-product-card__image"
        />
      </Link>
      <div className="shop-product-card__body">
        <h3 className="shop-product-card__title">
          <Link href={`/shop/products/${product.slug}`}>{product.title}</Link>
        </h3>
        {product.excerpt && (
          <p className="shop-product-card__excerpt">{product.excerpt}</p>
        )}
        <div className="shop-product-card__price">
          <span className="shop-product-card__price-current">
            {price.primaryLabel}
          </span>
          {price.compareAt != null && (
            <span className="shop-product-card__price-compare">
              ${price.compareAt.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
