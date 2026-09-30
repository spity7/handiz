"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShopCart } from "@/components/providers/ShopCartProvider";

type ShopCartLinkProps = {
  className?: string;
};

function formatCartCount(count: number): string {
  if (count > 99) return "99+";
  return String(count);
}

export default function ShopCartLink({ className }: ShopCartLinkProps) {
  const { itemCount } = useShopCart();
  const pathname = usePathname();
  const isActive = pathname === "/shop/cart";
  const hasItems = itemCount > 0;

  const ariaLabel = hasItems
    ? `Shopping cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`
    : "Shopping cart, empty";

  return (
    <Link
      href="/shop/cart"
      className={[
        "shop-cart-link",
        hasItems ? "shop-cart-link--has-items" : "",
        isActive ? "shop-cart-link--active" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
      title={hasItems ? `View cart (${itemCount})` : "View cart"}
    >
      <span className="shop-cart-link__icon" aria-hidden="true">
        <i className={`bi ${hasItems ? "bi-bag-fill" : "bi-bag"}`} />
      </span>
      {hasItems && (
        <span className="shop-cart-link__count" aria-hidden="true">
          {formatCartCount(itemCount)}
        </span>
      )}
    </Link>
  );
}
