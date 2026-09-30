"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopProduct } from "@/types/shop";
import { getShopPriceDisplay } from "@/lib/shopPricing";
import { useShopCart } from "@/components/providers/ShopCartProvider";

const DEFAULT_LOW_STOCK = 5;

function getCategoryLabel(product: ShopProduct): string | null {
  const first = product.categoryIds?.[0];
  if (!first || typeof first === "string") return null;
  return first.name;
}

export default function ProductDetailView({
  product,
  purchasable,
  shippingFee,
}: {
  product: ShopProduct;
  purchasable: boolean;
  shippingFee: number;
}) {
  const { addProduct } = useShopCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const price = getShopPriceDisplay(product);
  const images = Array.from(
    new Set([product.thumbnailUrl, ...(product.gallery || [])].filter(Boolean)),
  );
  const maxQty = product.trackInventory
    ? Math.max(1, product.stockQuantity ?? 0)
    : 99;

  const unit = parseFloat(price.primaryLabel.replace("$", "")) || 0;
  const onSale = price.compareAt != null && price.compareAt > unit;
  const savingsPct =
    onSale && price.compareAt
      ? Math.round((1 - unit / price.compareAt) * 100)
      : 0;

  const lowStock =
    product.trackInventory &&
    purchasable &&
    (product.stockQuantity ?? 0) <=
      (product.lowStockThreshold || DEFAULT_LOW_STOCK);

  const categoryLabel = getCategoryLabel(product);
  const lineTotal = unit * qty;
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const go = (delta: number) =>
    setActiveIndex((i) => (i + delta + images.length) % images.length);

  const clampQty = (n: number) => Math.min(maxQty, Math.max(1, n));

  const handleAdd = async () => {
    await addProduct(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasDescription = Boolean(product.description?.trim());

  return (
    <section className="shop-pdp tf-container tf-spacing-1">
      <header className="shop-pdp__header">
        {categoryLabel && (
          <span className="shop-pdp__category">{categoryLabel}</span>
        )}
        <h1 className="shop-pdp__title">{product.title}</h1>
      </header>

      <div className="shop-pdp__grid">
        <div className="shop-pdp__gallery">
          <div
            className={`shop-pdp__stage${zoom ? " is-zoomed" : ""}`}
            tabIndex={images.length > 1 ? 0 : undefined}
            onKeyDown={(e) => {
              if (images.length < 2) return;
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            {images[activeIndex] && (
              <Image
                key={images[activeIndex]}
                src={images[activeIndex]}
                alt={product.title}
                width={800}
                height={800}
                priority
                sizes="(min-width: 992px) 50vw, 100vw"
                style={
                  zoom
                    ? { transformOrigin: `${zoom.x}% ${zoom.y}%` }
                    : undefined
                }
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="shop-pdp__nav shop-pdp__nav--prev"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="shop-pdp__nav shop-pdp__nav--next"
                  onClick={() => go(1)}
                  aria-label="Next image"
                >
                  ›
                </button>
                <span className="shop-pdp__counter">
                  {activeIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>
          {images.length > 1 && (
            <ul className="shop-pdp__thumbs" aria-label="Product images">
              {images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    className={`shop-pdp__thumb${i === activeIndex ? " is-active" : ""}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === activeIndex}
                  >
                    <Image src={src} alt="" width={120} height={120} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="shop-pdp__info">
          {(product.sku || product.excerpt) && (
            <div className="shop-pdp__intro">
              {product.sku && (
                <p className="shop-pdp__sku">
                  <span className="shop-pdp__sku-label">SKU</span>
                  {product.sku}
                </p>
              )}
              {product.excerpt && (
                <p className="shop-pdp__excerpt">{product.excerpt}</p>
              )}
            </div>
          )}

          <div className="shop-pdp__buybox">
            <div className="shop-pdp__price-block">
              <div className="shop-pdp__price-head">
                <span className="shop-pdp__price-label">Price</span>
                {savingsPct > 0 && (
                  <span className="shop-pdp__save">Save {savingsPct}%</span>
                )}
              </div>
              <p className="shop-pdp__price-primary">
                <span className="shop-pdp__price-current">
                  {price.primaryLabel}
                </span>
              </p>
              {price.compareAt != null && price.compareAt > unit && (
                <p className="shop-pdp__price-was">
                  <span className="shop-pdp__price-was-label">List price</span>
                  <span className="shop-pdp__price-compare">
                    ${price.compareAt.toFixed(2)}
                  </span>
                </p>
              )}
              <p className="shop-pdp__shipping">
                <span className="shop-pdp__shipping-label">Shipping</span>
                <span className="shop-pdp__shipping-value">
                  + ${shippingFee.toFixed(2)} · Lebanon
                </span>
              </p>
            </div>

            <div className="shop-pdp__meta">
              {product.trackInventory && (
                <p
                  className={`shop-pdp__stock ${
                    !purchasable ? "is-out" : lowStock ? "is-low" : "is-in"
                  }`}
                >
                  <span className="shop-pdp__stock-dot" aria-hidden="true" />
                  {!purchasable
                    ? "Out of stock"
                    : lowStock
                      ? `Only ${product.stockQuantity} left`
                      : `${product.stockQuantity} in stock`}
                </p>
              )}
            </div>

            <div className="shop-pdp__actions">
              <div className="shop-pdp__qty" role="group" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQty((q) => clampQty(q - 1))}
                  disabled={!purchasable || qty <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="qty"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={maxQty}
                  value={qty}
                  disabled={!purchasable}
                  aria-label="Quantity"
                  onChange={(e) =>
                    setQty(clampQty(Number(e.target.value) || 1))
                  }
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => clampQty(q + 1))}
                  disabled={!purchasable || qty >= maxQty}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="tf-btn animate-hover-btn shop-pdp__add"
                disabled={!purchasable}
                onClick={handleAdd}
              >
                <span className="shop-pdp__add-text">
                  {!purchasable
                    ? "Out of stock"
                    : added
                      ? "Added to cart ✓"
                      : `Add to cart · $${lineTotal.toFixed(2)}`}
                </span>
              </button>
            </div>
            <p className="shop-pdp__live" role="status" aria-live="polite">
              {added ? "Item added to your cart" : ""}
            </p>

            <ul className="shop-pdp__perks">
              <li>Delivery available across Lebanon</li>
              <li>Secure checkout</li>
            </ul>
          </div>

          {hasDescription && (
            <div className="shop-pdp__details">
              <h2 className="shop-pdp__details-title">Product details</h2>
              <div
                className="shop-pdp__description"
                dangerouslySetInnerHTML={{ __html: product.description! }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
