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
    return (
      <section className="shop-checkout tf-container tf-spacing-1">
        <p>Preparing checkout…</p>
      </section>
    );
  }

  return (
    <section className="shop-checkout tf-container tf-spacing-1">
      <h1>Checkout</h1>
      <div className="shop-checkout__grid">
        <form className="shop-checkout__form" onSubmit={onSubmit}>
          <h2>Shipping (Lebanon)</h2>
          {(
            [
              ["fullName", "Full name"],
              ["phone", "Phone"],
              ["governorate", "Governorate"],
              ["city", "City"],
              ["area", "Area"],
              ["street", "Street"],
              ["building", "Building (optional)"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="mb-3">
              <label className="form-label" htmlFor={key}>
                {label}
              </label>
              <input
                id={key}
                className="form-control"
                required={key !== "building"}
                value={address[key]}
                onChange={(e) => setField(key, e.target.value)}
              />
            </div>
          ))}
          <div className="mb-3">
            <label className="form-label" htmlFor="notes">
              Delivery notes
            </label>
            <textarea
              id="notes"
              className="form-control"
              rows={3}
              value={address.notes}
              onChange={(e) => setField("notes", e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="tf-btn animate-hover-btn"
            disabled={submitting || !cartValid}
          >
            {submitting ? "Redirecting to payment…" : "Pay with Whish"}
          </button>
          <Link href="/shop/cart" className="d-block mt-3">
            ← Back to cart
          </Link>
        </form>
        <aside className="shop-checkout__summary">
          <h2>Order summary</h2>
          <ul className="list-unstyled">
            {lines.map((l) => (
              <li
                key={l.productId}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {l.title} × {l.quantity}
                </span>
                <span>${(l.unitPrice * l.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
