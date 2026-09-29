"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { fetchMyShopOrders } from "@/lib/shop";
import type { ShopOrder } from "@/types/shop";
import {
  buildDashboardAuthUrl,
  getCurrentReturnUrl,
} from "@/lib/dashboard-auth";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function ShopOrdersPage() {
  const { user, loading: authLoading } = useAuthUser();
  const [orders, setOrders] = useState<ShopOrder[]>([]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      window.location.href = buildDashboardAuthUrl(
        "/auth/sign-in",
        getCurrentReturnUrl() || "/shop/orders",
      );
      return;
    }
    fetchMyShopOrders().then((data) => setOrders(data.orders || []));
  }, [authLoading, user]);

  return (
    <>
      <Header1 />
      <div className="main-content">
        <section className="tf-container tf-spacing-1">
          <h1>Your orders</h1>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul className="list-unstyled">
              {orders.map((order) => (
                <li key={order._id} className="border-bottom py-3">
                  <Link href={`/shop/orders/${order._id}`}>
                    <strong>{order.orderNumber}</strong>
                  </Link>
                  <span className="ms-2 text-muted">
                    ${order.total.toFixed(2)} · {order.paymentStatus}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <Footer1 />
    </>
  );
}
