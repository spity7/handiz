"use client";

import Link from "next/link";
import { useShopCart } from "@/components/providers/ShopCartProvider";

type ShopCartLinkProps = {
  className?: string;
};

export default function ShopCartLink({ className }: ShopCartLinkProps) {
  const { itemCount } = useShopCart();

  return (
    <Link
      href="/shop/cart"
      className={["shop-cart-link", className].filter(Boolean).join(" ")}
      aria-label={`Shopping cart, ${itemCount} items`}
    >
      <i className="bi bi-bag" aria-hidden />
      {itemCount > 0 && (
        <span className="shop-cart-link__count">{itemCount}</span>
      )}
    </Link>
  );
}
