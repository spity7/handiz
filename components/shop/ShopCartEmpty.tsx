import Link from "next/link";

export default function ShopCartEmpty() {
  return (
    <div
      className="courses-catalog__empty shop-cart__catalog-empty"
      role="status"
      aria-live="polite"
    >
      <span className="courses-catalog__empty-eyebrow">Handiz Shop</span>
      <div className="courses-catalog__empty-icon" aria-hidden="true">
        <i className="bi bi-bag" />
      </div>
      <h2 className="courses-catalog__empty-title">Your bag is empty</h2>
      <p className="courses-catalog__empty-text shop-cart__empty-text">
        Browse tools and materials for your projects. Your cart syncs when
        you&apos;re signed in.
      </p>
      <div className="courses-catalog__empty-action shop-cart__empty-actions">
        <Link
          href="/shop"
          className="tf-btn btn-fill animate-hover-btn btn-switch-text courses-catalog__empty-btn shop-cart__empty-btn"
        >
          <span>
            <span className="btn-double-text" data-text="Browse products">
              Browse products
            </span>
          </span>
        </Link>
      </div>
      <ul className="shop-cart__empty-trust">
        <li>
          <i className="bi bi-shield-check" aria-hidden="true" />
          <span>Secure checkout with Whish Pay</span>
        </li>
        <li>
          <i className="bi bi-truck" aria-hidden="true" />
          <span>Shipping across Lebanon</span>
        </li>
      </ul>
    </div>
  );
}
