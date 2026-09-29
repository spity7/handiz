"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ShopOrder } from "@/types/shop";

export default function OrderDetailView({ order }: { order: ShopOrder }) {
  const searchParams = useSearchParams();
  const payment = searchParams.get("payment");

  return (
    <section className="shop-order tf-container tf-spacing-1">
      <h1>Order {order.orderNumber}</h1>
      {payment === "success" && (
        <p className="shop-order__alert shop-order__alert--success">
          Thank you! Your payment was received.
        </p>
      )}
      {payment === "failed" && (
        <p className="shop-order__alert shop-order__alert--error">
          Payment was not completed. You can try checkout again from your cart.
        </p>
      )}
      <p>
        Payment: <strong>{order.paymentStatus}</strong> · Fulfillment:{" "}
        <strong>{order.fulfillmentStatus}</strong>
      </p>
      <ul className="list-unstyled shop-order__items">
        {order.items.map((item, i) => (
          <li
            key={i}
            className="d-flex justify-content-between border-bottom py-2"
          >
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>${item.lineTotal.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <Link
          href="/shop/orders"
          className="tf-btn style-2 animate-hover-btn me-2"
        >
          All orders
        </Link>
        <Link href="/shop/products" className="tf-btn animate-hover-btn">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
