"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  categoryLinks,
  categoryLinks2,
  homePages,
  singlePostLinks,
} from "@/data/menu";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/menu-item";

export default function Nav() {
  const pathname = usePathname();
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const splittingLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    // already initialized? bail out
    if (splittingLoadedRef.current) return;

    // defer slightly so Bootstrap JS (tooltips/popovers, etc.) can attach first
    const timer = setTimeout(async () => {
      try {
        const mod = await import("splitting"); // dynamic import (CSR only)
        if (cancelled) return;

        // call Splitting (supports both default and named export shapes)
        const Splitting = (mod as any).default ?? (mod as any);
        Splitting();
        splittingLoadedRef.current = true;
      } catch (err) {
        // optional: log or handle
        // console.error("Failed to load Splitting", err);
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Add/remove body class depending on overlayEnabled
  useEffect(() => {
    if (overlayEnabled) {
      document.body.classList.add("menu-overlay-enabled");
    } else {
      document.body.classList.remove("menu-overlay-enabled");
    }
  }, [overlayEnabled]);

  const isMenuActive = (link: { href: string }) =>
    link.href?.split("/")[1] == pathname.split("/")[1];

  const isMenuParentActive = (menu: MenuItem[]) =>
    menu.some((elm) => isMenuActive(elm));

  // shared handlers
  const handleEnter = () => setOverlayEnabled(true);
  const handleLeave = () => setOverlayEnabled(false);

  return (
    <>
      {/* Home */}
      <li
        className={`text-menu ${
          isMenuParentActive(homePages) ? "current-menu" : ""
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <a href="/" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Home
          </span>
          <span className="text" data-splitting="">
            Home
          </span>
        </a>
        {/* <ul className="submenu">
          {homePages.map(({ href, label }) => (
            <li
              key={href}
              className={`menu-item ${
                isMenuActive({ href }) ? " current-menu-item" : ""
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul> */}
      </li>

      {/* Features */}
      <li
        className={`text-menu ${
          isMenuParentActive(categoryLinks) ? "current-menu" : ""
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Student Projects
          </span>
          <span className="text" data-splitting="">
            Student Projects
          </span>
        </a>
        {/* <ul className="submenu">
          {categoryLinks.map(({ href, label }) => (
            <li
              key={href}
              className={`menu-item ${
                isMenuActive({ href }) ? " current-menu-item" : ""
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul> */}
      </li>

      {/* Post Styles */}
      <li
        className={`text-menu ${
          isMenuParentActive(singlePostLinks) ? "current-menu" : ""
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Courses
          </span>
          <span className="text" data-splitting="">
            Courses
          </span>
        </a>
        {/* <ul className="submenu">
          {singlePostLinks.map(({ href, label }) => (
            <li
              key={href}
              className={`menu-item ${
                isMenuActive({ href }) ? " current-menu-item" : ""
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul> */}
      </li>

      {/* Categories */}
      <li
        className="text-menu"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <a href="#" className="toggle splitting link-no-action">
          <span className="text" data-splitting="">
            Who We Are?
          </span>
          <span className="text" data-splitting="">
            Who We Are?
          </span>
        </a>
        {/* <ul className="submenu">
          {categoryLinks2.map(({ href, label, slug }) => (
            <li key={label} className="menu-item">
              <Link href={`${href}/${slug}`}>{label}</Link>
            </li>
          ))}
        </ul> */}
      </li>

      {/* About */}
      {/* <li
        className={`text-menu ${
          isMenuActive({ href: "/about" }) ? " current-menu" : ""
        }`}
      >
        <Link href={`/about`} className="toggle splitting">
          <span className="text" data-splitting="">
            About
          </span>
          <span className="text" data-splitting="">
            About
          </span>
        </Link>
      </li> */}

      {/* Contact */}
      <li
        className={`text-menu ${
          isMenuActive({ href: "/contact" }) ? " current-menu" : ""
        }`}
      >
        <Link href={`/contact`} className="toggle splitting">
          <span className="text" data-splitting="">
            Contact
          </span>
          <span className="text" data-splitting="">
            Contact
          </span>
        </Link>
      </li>

      {/* Contact */}
      <li
        className={`text-menu ${
          isMenuActive({ href: "/contact" }) ? " current-menu" : ""
        }`}
      >
        <Link href={`/contact`} className="toggle splitting">
          <span className="text" data-splitting="">
            Volunteer
          </span>
          <span className="text" data-splitting="">
            Volunteer
          </span>
        </Link>
      </li>
    </>
  );
}
