"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useShopCart } from "@/components/providers/ShopCartProvider";
import { useAuthUser } from "@/hooks/useAuthUser";
import ShopCartEmpty from "./ShopCartEmpty";
import ShopCartLoadingSkeleton from "./ShopCartLoadingSkeleton";

function clampQuantity(value: number, max: number) {
  return Math.min(max, Math.max(1, value));
}

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

  const isEmpty = itemCount === 0;
  const isLoadingEmpty = isEmpty && syncing;

  const showSyncBadge = !isEmpty && !isLoadingEmpty && syncing;

  return (
    <section
      className={`shop-cart tf-container w-xxl tf-spacing-1${showSyncBadge ? " shop-cart--syncing" : ""}`}
    >
      <header className="shop-cart__header">
        <div className="shop-cart__header-inner">
          <div className="shop-cart__header-copy">
            <span className="shop-cart__eyebrow">Handiz Shop</span>
            <h1 className="shop-cart__title">Your cart</h1>
            <p className="shop-cart__subtitle">
              {isLoadingEmpty
                ? "Loading your saved items…"
                : isEmpty
                  ? "Nothing in your bag yet"
                  : `${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            </p>
          </div>
          {showSyncBadge && (
            <p
              className="shop-cart__sync-badge"
              role="status"
              aria-live="polite"
            >
              <span className="shop-cart__sync-spinner" aria-hidden="true" />
              Syncing cart…
            </p>
          )}
        </div>
      </header>

      {isLoadingEmpty ? (
        <ShopCartLoadingSkeleton />
      ) : isEmpty ? (
        <ShopCartEmpty />
      ) : (
        <>
          {!cartValid && cartIssues.length > 0 && (
            <p className="shop-order__alert shop-order__alert--error">
              Some items were adjusted or are unavailable. Review quantities
              before checkout.
            </p>
          )}
          <div className="shop-cart__layout">
            <div className="shop-cart__main">
              <div className="shop-cart__panel shop-cart__panel--items">
                <div
                  className="shop-cart__lines"
                  role="table"
                  aria-label="Items in your cart"
                >
                  <div
                    className="shop-cart__lines-head"
                    role="row"
                    aria-hidden="true"
                  >
                    <span
                      className="shop-cart__lines-col-product"
                      role="columnheader"
                    >
                      Product
                    </span>
                    <span
                      className="shop-cart__lines-col-qty"
                      role="columnheader"
                    >
                      Quantity
                    </span>
                    <span
                      className="shop-cart__lines-col-total"
                      role="columnheader"
                    >
                      Total
                    </span>
                  </div>
                  {lines.map((line) => {
                    const maxQty = line.maxQuantity || 99;
                    const lineTotal = (
                      line.lineTotal ?? line.unitPrice * line.quantity
                    ).toFixed(2);

                    return (
                      <article
                        key={line.productId}
                        className="shop-cart__line"
                        role="row"
                      >
                        <div className="shop-cart__line-product" role="cell">
                          <div className="shop-cart__product">
                            <Link
                              href={`/shop/products/${line.slug}`}
                              className="shop-cart__thumb-link"
                            >
                              <Image
                                src={line.thumbnailUrl}
                                alt=""
                                width={104}
                                height={104}
                                className="shop-cart__thumb"
                              />
                            </Link>
                            <div className="shop-cart__row-main">
                              <Link
                                href={`/shop/products/${line.slug}`}
                                className="shop-cart__product-title"
                              >
                                {line.title}
                              </Link>
                              <p className="shop-cart__unit-price">
                                ${line.unitPrice.toFixed(2)} each
                              </p>
                              {line.issues && line.issues.length > 0 && (
                                <p className="shop-cart__issue text-warning small">
                                  {line.issues.join(", ")}
                                </p>
                              )}
                              <button
                                type="button"
                                className="shop-cart__remove"
                                onClick={() => removeLine(line.productId)}
                              >
                                <i
                                  className="bi bi-trash3"
                                  aria-hidden="true"
                                />
                                <span>Remove item</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="shop-cart__line-qty"
                          role="cell"
                          data-label="Quantity"
                        >
                          <div
                            className="shop-cart__qty shop-cart__qty--line"
                            role="group"
                            aria-label={`Quantity for ${line.title}`}
                          >
                            <button
                              type="button"
                              className="shop-cart__qty-btn"
                              onClick={() =>
                                setQuantity(
                                  line.productId,
                                  clampQuantity(line.quantity - 1, maxQty),
                                )
                              }
                              disabled={line.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <i className="bi bi-dash-lg" aria-hidden="true" />
                            </button>
                            <input
                              type="number"
                              inputMode="numeric"
                              min={1}
                              max={maxQty}
                              value={line.quantity}
                              onChange={(e) =>
                                setQuantity(
                                  line.productId,
                                  clampQuantity(
                                    Number(e.target.value) || 1,
                                    maxQty,
                                  ),
                                )
                              }
                              aria-label="Quantity"
                            />
                            <button
                              type="button"
                              className="shop-cart__qty-btn"
                              onClick={() =>
                                setQuantity(
                                  line.productId,
                                  clampQuantity(line.quantity + 1, maxQty),
                                )
                              }
                              disabled={line.quantity >= maxQty}
                              aria-label="Increase quantity"
                            >
                              <i className="bi bi-plus-lg" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div
                          className="shop-cart__line-total"
                          role="cell"
                          data-label="Total"
                        >
                          <span className="shop-cart__line-amount">
                            ${lineTotal}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="shop-cart__panel-footer">
                  <Link href="/shop" className="shop-cart__continue">
                    <i className="bi bi-arrow-left" aria-hidden="true" />
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
            <aside
              className="shop-cart__summary"
              aria-labelledby="cart-summary-title"
            >
              <h2 id="cart-summary-title" className="shop-cart__summary-title">
                Order summary
                <span className="shop-cart__summary-count">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </h2>
              <ul className="shop-cart__summary-items">
                {lines.map((line) => (
                  <li key={line.productId}>
                    <span className="shop-cart__summary-item-name">
                      {line.title}
                      <span className="shop-cart__summary-item-qty">
                        × {line.quantity}
                      </span>
                    </span>
                    <span className="shop-cart__summary-item-price">
                      $
                      {(
                        line.lineTotal ?? line.unitPrice * line.quantity
                      ).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="shop-cart__summary-lines">
                <div className="shop-cart__summary-line">
                  <dt>Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                <div className="shop-cart__summary-line">
                  <dt>Shipping</dt>
                  <dd>${ship.toFixed(2)}</dd>
                </div>
                <div className="shop-cart__summary-line shop-cart__summary-line--total">
                  <dt>Estimated total</dt>
                  <dd>${displayTotal.toFixed(2)}</dd>
                </div>
              </dl>
              <Link
                href="/shop/checkout"
                className={`tf-btn btn-fill animate-hover-btn shop-cart__checkout${!cartValid && isAuthenticated ? " disabled" : ""}`}
                aria-disabled={!cartValid && isAuthenticated}
              >
                Proceed to checkout
              </Link>
              <ul className="shop-cart__summary-trust">
                <li>
                  <i className="bi bi-shield-check" aria-hidden="true" />
                  Secure checkout
                </li>
                <li>
                  <i className="bi bi-truck" aria-hidden="true" />
                  Shipping across Lebanon
                </li>
              </ul>
              {!isAuthenticated && (
                <p className="shop-cart__summary-note">
                  Sign in at checkout to save your cart across devices.
                </p>
              )}
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
