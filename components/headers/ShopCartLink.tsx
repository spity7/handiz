"use client";

import Link from "next/link";
import { useShopCart } from "@/components/providers/ShopCartProvider";

export default function ShopCartLink() {
  const { itemCount } = useShopCart();

  return (
    <Link
      href="/shop/cart"
      className="shop-cart-link"
      aria-label={`Shopping cart, ${itemCount} items`}
    >
      <i className="bi bi-bag" aria-hidden />
      {itemCount > 0 && (
        <span className="shop-cart-link__count">{itemCount}</span>
      )}
    </Link>
  );
}
