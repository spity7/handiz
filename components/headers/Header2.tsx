"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import DarkModeToggler from "./DarkModeToggler";

export default function Header2() {
  const [isFixed, setIsFixed] = useState(false);
  const [willFixed, setWillFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 260) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
      if (window.scrollY >= 210) {
        setWillFixed(true);
      } else {
        setWillFixed(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      {/* header-menu */}
      <div
        className={`header-menu style-1 ${isFixed ? "is-fixed" : ""} ${
          willFixed ? "header-fixed" : ""
        } `}
      >
        <div className="tf-container w-xxl">
          <div className="header-inner d-flex justify-content-between align-items-center">
            <div className="header-left">
              <Link href={`/`} className="site-logo">
                <Image
                  alt="logo"
                  className="main-logo light-mode-logo"
                  src="/images/logo/logo.svg"
                  width={194}
                  height={44}
                />
                <Image
                  alt="logo"
                  className="main-logo dark-mode-logo"
                  src="/images/logo/logo-dark.svg"
                  width={194}
                  height={44}
                />
              </Link>
              <nav className="main-menu lg-hide">
                <ul className="navigation">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="header-right d-flex justify-content-end align-items-center">
              <DarkModeToggler />
              <a
                className="btn-find"
                href="#canvasSearch"
                data-bs-toggle="offcanvas"
              >
                <i className="icon-search" />
              </a>
              <Link
                href={`/contact`}
                className="tf-btn style-2 animate-hover-btn btn-switch-text md-hide"
              >
                <span>
                  <span className="btn-double-text" data-text="Let's Talk!">
                    Let's Talk!
                  </span>
                </span>
              </Link>
              <div
                className="mobile-button d-xl-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#menu-mobile"
                aria-controls="menu-mobile"
              >
                <div className="burger">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End header-menu */}
    </header>
  );
}
