"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getUserInitials, logoutUser } from "@/lib/auth";
import {
  buildDashboardAuthUrl,
  getCurrentReturnUrl,
} from "@/lib/dashboard-auth";
import { useAuthUser } from "@/hooks/useAuthUser";

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "";
const myProjectsHref = `${dashboardUrl}/ecommerce/student-projects`;

export default function AccountMenu() {
  const { user, isAuthenticated, loading, refresh } = useAuthUser();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [signInHref] = useState(() =>
    buildDashboardAuthUrl("/auth/sign-in", getCurrentReturnUrl()),
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (event: PointerEvent | MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Defer so the same click that opened the menu does not immediately close it.
    const timer = window.setTimeout(() => {
      document.addEventListener("pointerdown", handleOutside, true);
      document.addEventListener("mousedown", handleOutside, true);
    }, 0);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", handleOutside, true);
      document.removeEventListener("mousedown", handleOutside, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const displayName =
    user?.firstname || user?.username || user?.email || "Account";

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    try {
      const success = await logoutUser();
      setOpen(false);

      if (success) {
        window.location.reload();
        return;
      }

      await refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <button
            type="button"
            className="account-menu-backdrop"
            aria-label="Close account menu"
            onClick={() => setOpen(false)}
          />,
          document.body,
        )}

      <div className={`account-menu${open ? " is-open" : ""}`} ref={menuRef}>
        <button
          type="button"
          className="account-menu__toggle"
          aria-label="Account menu"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={`account-menu__avatar-ring${
              isAuthenticated && user ? " account-menu__avatar-ring--auth" : ""
            }`}
          >
            {loading ? (
              <span className="account-menu__avatar account-menu__avatar--loading" />
            ) : isAuthenticated && user ? (
              <span className="account-menu__avatar" aria-hidden="true">
                {getUserInitials(user)}
              </span>
            ) : (
              <span className="account-menu__avatar account-menu__avatar--guest">
                <i className="bi bi-person-fill" aria-hidden="true" />
              </span>
            )}
          </span>
          <i
            className="bi bi-chevron-down account-menu__chevron"
            aria-hidden="true"
          />
        </button>

        {open && (
          <div className="account-menu__dropdown" role="menu">
            {isAuthenticated && user && (
              <div className="account-menu__header">
                <span
                  className="account-menu__header-avatar"
                  aria-hidden="true"
                >
                  {getUserInitials(user)}
                </span>
                <div className="account-menu__header-text">
                  <span className="account-menu__name">{displayName}</span>
                  {user.email && (
                    <span className="account-menu__email text-secondary">
                      {user.email}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="account-menu__body">
              {isAuthenticated ? (
                <>
                  <a
                    href={myProjectsHref}
                    className="account-menu__item"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <span className="account-menu__item-icon">
                      <i className="bi bi-folder2-open" aria-hidden="true" />
                    </span>
                    <span className="account-menu__item-label">
                      My Projects
                    </span>
                    <i
                      className="bi bi-arrow-right account-menu__item-arrow account-menu__item-arrow--visible"
                      aria-hidden="true"
                    />
                  </a>
                  <div className="account-menu__divider" role="separator" />
                  <button
                    type="button"
                    className="account-menu__item account-menu__item--logout"
                    role="menuitem"
                    disabled={loggingOut}
                    onClick={handleLogout}
                  >
                    <span className="account-menu__item-icon">
                      <i className="bi bi-box-arrow-left" aria-hidden="true" />
                    </span>
                    <span className="account-menu__item-label">
                      {loggingOut ? "Logging out…" : "Logout"}
                    </span>
                  </button>
                </>
              ) : (
                <a
                  href={signInHref}
                  className="account-menu__item account-menu__item--primary"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  <span className="account-menu__item-icon">
                    <i
                      className="bi bi-box-arrow-in-right"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="account-menu__item-label">Sign In</span>
                  <i
                    className="bi bi-arrow-right account-menu__item-arrow account-menu__item-arrow--visible"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
