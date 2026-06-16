"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import DarkModeToggler from "./DarkModeToggler";
import AccountMenu from "./AccountMenu";

const studentProjectsHref = `${process.env.NEXT_PUBLIC_DASHBOARD_URL || ""}/ecommerce/student-projects`;

export default function Header1() {
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
    <header className="bg-surface-color">
      {/* topbar */}
      <div className="topbar py-3">
        <div className="tf-container">
          <div className="topbar-inner d-flex justify-content-between align-items-center">
            <ul className="tf-social d-flex lg-hide">
              <li>
                <a
                  href="https://wa.me/96171601751"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bi-whatsapp"
                />
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/handiz-architecture-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bi-linkedin"
                />
              </li>
              <li>
                <a
                  href="https://www.instagram.com/handizacademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-InstagramLogo"
                />
              </li>
              {/* <li>
                <a href="#" className="icon-PinterestLogo" />
              </li> */}
            </ul>
            <Link href={`/`} className="site-logo">
              <Image
                alt="logo"
                className="main-logo light-mode-logo"
                width={193}
                height={44}
                src="/images/logo/Logo-black-black.png"
              />
              <Image
                alt="logo"
                className="main-logo dark-mode-logo"
                width={193}
                height={44}
                src="/images/logo/Logo white - White.png"
              />
            </Link>
            <div className="wrap d-flex justify-content-end">
              <DarkModeToggler />
              <a
                href={studentProjectsHref}
                className="tf-btn style-2 btn-project-cta btn-switch-text animate-hover-btn md-hide"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <span
                    className="btn-double-text"
                    data-text="Add Your Project!"
                  >
                    Add Your Project!
                  </span>
                </span>
              </a>
              <AccountMenu />
            </div>
          </div>
        </div>
      </div>
      {/* End topbar */}
      {/* header-menu */}
      <div
        className={`header-menu style-default ${isFixed ? "is-fixed" : ""} ${
          willFixed ? "header-fixed" : ""
        } `}
      >
        <div className="tf-container">
          <div className="header-inner d-flex justify-content-between align-items-center">
            <div
              className="mobile-button d-lg-none"
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
            <a
              href={studentProjectsHref}
              className="tf-btn style-2 btn-project-cta animate-hover-btn d-md-none"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Add Your Project!</span>
            </a>
            <nav className="main-menu lg-hide">
              <ul className="navigation">
                <Nav />
              </ul>
            </nav>
            {/* <a
              className="btn-find link-no-action"
              href="#canvasSearch"
              data-bs-toggle="offcanvas"
            >
              <i className="icon-search" />
            </a> */}
          </div>
        </div>
      </div>
      {/* End header-menu */}

      {/* End header-menu */}
    </header>
  );
}
