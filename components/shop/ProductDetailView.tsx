"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ShopProduct } from "@/types/shop";
import { getShopPriceDisplay } from "@/lib/shopPricing";
import { useShopCart } from "@/components/providers/ShopCartProvider";

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
  const price = getShopPriceDisplay(product);
  const images = [product.thumbnailUrl, ...(product.gallery || [])];

  const handleAdd = async () => {
    await addProduct(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="shop-pdp tf-container tf-spacing-1">
      <div className="shop-pdp__grid">
        <div className="shop-pdp__gallery">
          {images.map((src) => (
            <div key={src} className="shop-pdp__gallery-item">
              <Image src={src} alt={product.title} width={600} height={600} />
            </div>
          ))}
        </div>
        <div className="shop-pdp__info">
          <Link href="/shop/products" className="shop-pdp__back">
            ← Back to shop
          </Link>
          <h1>{product.title}</h1>
          {product.sku && (
            <p className="text-muted small">SKU: {product.sku}</p>
          )}
          <div className="shop-pdp__price">
            <span className="shop-pdp__price-current">
              {price.primaryLabel}
            </span>
            {price.compareAt != null && (
              <span className="shop-pdp__price-compare">
                ${price.compareAt.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-muted">
            + ${shippingFee.toFixed(2)} shipping (Lebanon)
          </p>
          {product.trackInventory && (
            <p className="shop-pdp__stock">
              {purchasable
                ? `${product.stockQuantity} in stock`
                : "Out of stock"}
            </p>
          )}
          <div className="shop-pdp__qty-row">
            <label htmlFor="qty">Quantity</label>
            <input
              id="qty"
              type="number"
              min={1}
              max={product.trackInventory ? product.stockQuantity : 99}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
          <button
            type="button"
            className="tf-btn animate-hover-btn w-100"
            disabled={!purchasable}
            onClick={handleAdd}
          >
            {added ? "Added to cart" : "Add to cart"}
          </button>
          {product.excerpt && (
            <p className="shop-pdp__excerpt">{product.excerpt}</p>
          )}
          {product.description && (
            <div
              className="shop-pdp__description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
