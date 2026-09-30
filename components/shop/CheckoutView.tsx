"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShopCart } from "@/components/providers/ShopCartProvider";
import { createShopCheckout, validateServerCart } from "@/lib/shopCart";
import {
  buildDashboardAuthUrl,
  getCurrentReturnUrl,
} from "@/lib/dashboard-auth";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { ShopShippingAddress } from "@/types/shop";

const emptyAddress: ShopShippingAddress = {
  fullName: "",
  phone: "",
  governorate: "",
  city: "",
  area: "",
  street: "",
  building: "",
  notes: "",
};

const addressFields: {
  key: keyof ShopShippingAddress;
  label: string;
  type?: "text" | "tel";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  wide?: boolean;
}[] = [
  {
    key: "fullName",
    label: "Full name",
    required: true,
    autoComplete: "name",
    placeholder: "As shown on your ID",
    wide: true,
  },
  {
    key: "phone",
    label: "Phone",
    type: "tel",
    required: true,
    autoComplete: "tel",
    placeholder: "+961 …",
    wide: true,
  },
  {
    key: "governorate",
    label: "Governorate",
    required: true,
    autoComplete: "address-level1",
  },
  {
    key: "city",
    label: "City",
    required: true,
    autoComplete: "address-level2",
  },
  { key: "area", label: "Area", required: true },
  {
    key: "street",
    label: "Street",
    required: true,
    autoComplete: "street-address",
    wide: true,
  },
  {
    key: "building",
    label: "Building",
    required: false,
    placeholder: "Optional — floor, apartment, landmark",
    wide: true,
  },
];

function CheckoutLoading() {
  return (
    <section className="shop-checkout tf-container w-xxl tf-spacing-1">
      <header className="shop-checkout__header">
        <div className="shop-checkout__header-copy">
          <span className="shop-checkout__eyebrow">Handiz Shop</span>
          <h1 className="shop-checkout__title">Checkout</h1>
          <p className="shop-checkout__subtitle">Preparing your order…</p>
        </div>
      </header>
      <div className="shop-checkout__layout shop-checkout__layout--loading">
        <div className="shop-checkout__panel">
          <div className="shop-checkout__skeleton-block" />
          <div className="shop-checkout__skeleton-block shop-checkout__skeleton-block--short" />
        </div>
        <aside className="shop-checkout__summary" aria-hidden="true">
          <div className="shop-checkout__skeleton-block" />
        </aside>
      </div>
    </section>
  );
}

export default function CheckoutView({
  shippingFee: _shippingFee,
}: {
  shippingFee: number;
}) {
  const {
    lines,
    itemCount,
    subtotal,
    shippingFee,
    total,
    cartValid,
    cartIssues,
    clearCart,
    refreshCart,
  } = useShopCart();
  const { user, loading: authLoading } = useAuthUser();
  const router = useRouter();
  const [address, setAddress] = useState<ShopShippingAddress>(emptyAddress);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      refreshCart();
    }
  }, [user, refreshCart]);

  useEffect(() => {
    if (!authLoading && !user) {
      const returnUrl = getCurrentReturnUrl() || "/shop/checkout";
      window.location.href = buildDashboardAuthUrl("/auth/sign-in", returnUrl);
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (itemCount === 0) {
      router.replace("/shop/cart");
    }
  }, [itemCount, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const validation = await validateServerCart();
      if (!validation.valid) {
        setError(
          validation.message ||
            "Your cart was updated. Please review your cart and try again.",
        );
        await refreshCart();
        setSubmitting(false);
        return;
      }
      const result = await createShopCheckout(address);
      await clearCart();
      window.location.href = result.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setSubmitting(false);
    }
  };

  const setField = (key: keyof ShopShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  if (authLoading || !user) {
    return <CheckoutLoading />;
  }

  return (
    <section className="shop-checkout tf-container w-xxl tf-spacing-1">
      <header className="shop-checkout__header">
        <div className="shop-checkout__header-copy">
          <span className="shop-checkout__eyebrow">Handiz Shop</span>
          <h1 className="shop-checkout__title">Checkout</h1>
          <p className="shop-checkout__subtitle">
            {itemCount} {itemCount === 1 ? "item" : "items"} · delivery in
            Lebanon
          </p>
        </div>
        <nav className="shop-checkout__steps" aria-label="Checkout progress">
          <ol className="shop-checkout__steps-track">
            <li className="shop-checkout__step shop-checkout__step--done">
              <Link href="/shop/cart" className="shop-checkout__step-card">
                <span className="shop-checkout__step-marker" aria-hidden="true">
                  <i className="bi bi-check-lg" />
                </span>
                <span className="shop-checkout__step-text">
                  <span className="shop-checkout__step-label">Cart</span>
                  <span className="shop-checkout__step-hint">Completed</span>
                </span>
              </Link>
            </li>
            <li
              className="shop-checkout__step shop-checkout__step--current"
              aria-current="step"
            >
              <div className="shop-checkout__step-card shop-checkout__step-card--static">
                <span className="shop-checkout__step-marker" aria-hidden="true">
                  2
                </span>
                <span className="shop-checkout__step-text">
                  <span className="shop-checkout__step-label">Shipping</span>
                  <span className="shop-checkout__step-hint">
                    You&apos;re here
                  </span>
                </span>
              </div>
            </li>
            <li className="shop-checkout__step shop-checkout__step--next">
              <div className="shop-checkout__step-card shop-checkout__step-card--static">
                <span className="shop-checkout__step-marker" aria-hidden="true">
                  3
                </span>
                <span className="shop-checkout__step-text">
                  <span className="shop-checkout__step-label">Payment</span>
                  <span className="shop-checkout__step-hint">Whish Pay</span>
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </header>

      {!cartValid && cartIssues.length > 0 && (
        <p className="shop-order__alert shop-order__alert--error shop-checkout__alert">
          Some items in your cart changed. Review your cart before paying.
        </p>
      )}

      <div className="shop-checkout__layout">
        <div className="shop-checkout__main">
          <form className="shop-checkout__form" onSubmit={onSubmit}>
            <div className="shop-checkout__panel">
              <div className="shop-checkout__panel-head">
                <h2 className="shop-checkout__panel-title">
                  <i className="bi bi-geo-alt" aria-hidden="true" />
                  Shipping address
                </h2>
                <p className="shop-checkout__panel-lead">
                  We deliver across Lebanon. Double-check your phone number so
                  the courier can reach you.
                </p>
              </div>

              <div className="shop-checkout__fields">
                {addressFields.map(
                  ({
                    key,
                    label,
                    type = "text",
                    required = true,
                    autoComplete,
                    placeholder,
                    wide,
                  }) => (
                    <div
                      key={key}
                      className={`shop-checkout__field${wide ? " shop-checkout__field--wide" : ""}`}
                    >
                      <label className="shop-checkout__label" htmlFor={key}>
                        {label}
                        {!required && (
                          <span className="shop-checkout__label-optional">
                            Optional
                          </span>
                        )}
                      </label>
                      <input
                        id={key}
                        name={key}
                        type={type}
                        className="shop-checkout__input"
                        required={required}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        value={address[key]}
                        onChange={(e) => setField(key, e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                  ),
                )}
              </div>

              <div className="shop-checkout__field shop-checkout__field--wide">
                <label className="shop-checkout__label" htmlFor="notes">
                  Delivery notes
                  <span className="shop-checkout__label-optional">
                    Optional
                  </span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="shop-checkout__input shop-checkout__input--textarea"
                  rows={3}
                  placeholder="Gate code, preferred time, or other instructions"
                  value={address.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="shop-checkout__form-actions">
              {error && (
                <p
                  className="shop-order__alert shop-order__alert--error shop-checkout__form-error"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="tf-btn btn-fill animate-hover-btn shop-checkout__pay"
                disabled={submitting || !cartValid}
              >
                {submitting ? (
                  <>
                    <span
                      className="shop-checkout__pay-spinner"
                      aria-hidden="true"
                    />
                    Redirecting to payment…
                  </>
                ) : (
                  <>
                    Pay with Whish
                    <span className="shop-checkout__pay-total">
                      ${total.toFixed(2)}
                    </span>
                  </>
                )}
              </button>
              <p className="shop-checkout__pay-note">
                You&apos;ll complete payment securely on Whish. Your cart is
                cleared only after a successful redirect.
              </p>
              <Link href="/shop/cart" className="shop-checkout__back">
                <i className="bi bi-arrow-left" aria-hidden="true" />
                Back to cart
              </Link>
            </div>
          </form>
        </div>

        <aside
          className="shop-checkout__summary"
          aria-labelledby="checkout-summary-title"
        >
          <h2
            id="checkout-summary-title"
            className="shop-checkout__summary-title"
          >
            Order summary
            <span className="shop-checkout__summary-count">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </h2>
          <ul className="shop-checkout__summary-items">
            {lines.map((l) => (
              <li key={l.productId}>
                <span className="shop-checkout__summary-item-name">
                  {l.title}
                  <span className="shop-checkout__summary-item-qty">
                    × {l.quantity}
                  </span>
                </span>
                <span className="shop-checkout__summary-item-price">
                  ${(l.lineTotal ?? l.unitPrice * l.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="shop-checkout__summary-lines">
            <div className="shop-checkout__summary-line">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="shop-checkout__summary-line">
              <dt>Shipping</dt>
              <dd>${shippingFee.toFixed(2)}</dd>
            </div>
            <div className="shop-checkout__summary-line shop-checkout__summary-line--total">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <ul className="shop-checkout__summary-trust">
            <li>
              <i className="bi bi-shield-check" aria-hidden="true" />
              Secure payment with Whish
            </li>
            <li>
              <i className="bi bi-truck" aria-hidden="true" />
              Nationwide delivery
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
