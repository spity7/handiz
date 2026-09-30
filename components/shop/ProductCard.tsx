import Link from "next/link";
import Image from "next/image";
import type { ShopProduct } from "@/types/shop";
import { getShopPriceDisplay } from "@/lib/shopPricing";

function getCategoryLabel(product: ShopProduct): string | null {
  const first = product.categoryIds?.[0];
  if (!first || typeof first === "string") return null;
  return first.name;
}

export default function ProductCard({ product }: { product: ShopProduct }) {
  const price = getShopPriceDisplay(product);
  const categoryLabel = getCategoryLabel(product);
  const onSale = price.compareAt != null;
  const unit =
    Number(product.unitPrice ?? product.salePrice ?? product.price) || 0;
  const list = Number(product.listPrice ?? product.price) || 0;
  const discountPct =
    onSale && list > 0 && unit > 0 ? Math.round((1 - unit / list) * 100) : null;
  const saleBadgeLabel =
    discountPct != null && discountPct > 0 ? `${discountPct}% OFF` : "Sale";

  return (
    <article className="shop-product-card feature-post-item style-default hover-image-translate">
      <Link
        href={`/shop/products/${product.slug}`}
        className="shop-product-card__media img-style"
      >
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          width={400}
          height={400}
          sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 20vw"
          className="shop-product-card__image lazyload"
        />
        {(onSale || product.featured) && (
          <div className="wrap-tag shop-product-card__tags">
            <div className="shop-product-card__tags-leading">
              {onSale && (
                <span className="shop-product-card__badge shop-product-card__badge--sale">
                  {saleBadgeLabel}
                </span>
              )}
            </div>
            {product.featured && (
              <span className="shop-product-card__badge shop-product-card__badge--featured">
                Featured
              </span>
            )}
          </div>
        )}
      </Link>
      <div className="shop-product-card__body content">
        <div className="shop-product-card__meta">
          {categoryLabel && (
            <span className="shop-product-card__category">{categoryLabel}</span>
          )}
          <h3 className="shop-product-card__title title">
            <Link href={`/shop/products/${product.slug}`}>{product.title}</Link>
          </h3>
          {product.excerpt && (
            <p className="shop-product-card__excerpt text-body-2">
              {product.excerpt}
            </p>
          )}
        </div>
        <div className="shop-product-card__footer">
          <div
            className={`shop-product-card__price${onSale ? " shop-product-card__price--sale" : ""}`}
          >
            <div className="shop-product-card__price-main">
              <span className="shop-product-card__price-current">
                {price.primaryLabel}
              </span>
              {price.compareAt != null && (
                <s className="shop-product-card__price-compare">
                  ${price.compareAt.toFixed(2)}
                </s>
              )}
            </div>
            {onSale && discountPct != null && discountPct > 0 && (
              <span className="shop-product-card__price-note">
                Save {discountPct}%
              </span>
            )}
          </div>
          <Link
            href={`/shop/products/${product.slug}`}
            className="shop-product-card__cta"
            aria-label={`View ${product.title}`}
          >
            <span className="shop-product-card__cta-text">View</span>
            <i className="icon-CaretRight" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
