"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useShopCart } from "@/components/providers/ShopCartProvider";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function CartView({
  shippingFee: fallbackShipping,
}: {
  shippingFee: number;
}) {
  const {
    lines,
    setQuantity,
    removeLine,
    itemCount,
    subtotal,
    shippingFee,
    total,
    cartIssues,
    cartValid,
    syncing,
    refreshCart,
    isAuthenticated,
  } = useShopCart();
  const { user } = useAuthUser();

  useEffect(() => {
    if (user) {
      refreshCart();
    }
  }, [user, refreshCart]);

  const ship = isAuthenticated ? shippingFee : fallbackShipping;
  const displayTotal = isAuthenticated ? total : subtotal + fallbackShipping;

  if (itemCount === 0 && !syncing) {
    return (
      <section className="shop-cart tf-container tf-spacing-1">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/shop/products" className="tf-btn animate-hover-btn">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="shop-cart tf-container tf-spacing-1">
      <h1>Your cart</h1>
      {syncing && <p className="text-muted small">Updating cart…</p>}
      {!cartValid && cartIssues.length > 0 && (
        <p className="shop-order__alert shop-order__alert--error">
          Some items were adjusted or are unavailable. Review quantities before
          checkout.
        </p>
      )}
      <div className="shop-cart__table">
        {lines.map((line) => (
          <div key={line.productId} className="shop-cart__row">
            <Image
              src={line.thumbnailUrl}
              alt=""
              width={72}
              height={72}
              className="rounded"
            />
            <div className="shop-cart__row-main">
              <Link href={`/shop/products/${line.slug}`}>{line.title}</Link>
              <p>${line.unitPrice.toFixed(2)} each</p>
              {line.issues && line.issues.length > 0 && (
                <p className="text-warning small">{line.issues.join(", ")}</p>
              )}
            </div>
            <input
              type="number"
              min={1}
              max={line.maxQuantity || 99}
              value={line.quantity}
              onChange={(e) =>
                setQuantity(line.productId, Number(e.target.value) || 1)
              }
              aria-label="Quantity"
            />
            <span className="shop-cart__line-total">
              ${(line.lineTotal ?? line.unitPrice * line.quantity).toFixed(2)}
            </span>
            <button
              type="button"
              className="shop-cart__remove"
              onClick={() => removeLine(line.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="shop-cart__summary">
        <div className="d-flex justify-content-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping</span>
          <span>${ship.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold mt-2">
          <span>Estimated total</span>
          <span>${displayTotal.toFixed(2)}</span>
        </div>
        <Link
          href="/shop/checkout"
          className={`tf-btn animate-hover-btn w-100 mt-3${!cartValid && isAuthenticated ? " disabled" : ""}`}
          aria-disabled={!cartValid && isAuthenticated}
        >
          Proceed to checkout
        </Link>
        {!isAuthenticated && (
          <p className="text-muted small mt-2">
            Sign in at checkout to save your cart across devices.
          </p>
        )}
      </div>
    </section>
  );
}
