"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useState } from "react";

export default function SidebarMenu() {
  const [showSidebar, setShowSidebar] = useState(false);
  // useCallback prevents re-creating the function on every render
  const openSidebar = useCallback(() => setShowSidebar(true), []);
  const closeSidebar = useCallback(() => setShowSidebar(false), []);

  return (
    <>
      {" "}
      <div
        className={`overlay-blog ${showSidebar ? "show" : ""} `}
        id="overlay-blog"
        onClick={closeSidebar}
      />
      <div className="show-sidebar" onClick={openSidebar}>
        <div className="icon">
          <div className="bars" id="bar1"></div>
          <div className="bars" id="bar2"></div>
          <div className="bars" id="bar3"></div>
        </div>
      </div>
      <div className={`left-bar  ${showSidebar ? "show" : ""} `}>
        <div className="canvas-wrapper">
          <div className="box-author style-1 text-center">
            <Link href={`/`} className="site-logo">
              <Image
                alt="logo"
                height="193"
                width="44"
                className="main-logo light-mode-logo"
                src="/images/logo/logo.svg"
              />
              <Image
                alt="logo"
                height="193"
                width="44"
                className="main-logo dark-mode-logo"
                src="/images/logo/logo-dark.svg"
              />
            </Link>
            <div className="info">
              <div className="avatar">
                <Image
                  alt="avatar"
                  src="/images/avatar/main-avatar.jpg"
                  width="400"
                  height="400"
                />
              </div>
              <h4 className="mb_4">
                <a href="#" className="link">
                  Emma Carson
                </a>
              </h4>
              <p className="text-body-1">Portland, Oregon, USA</p>
            </div>
            <ul className="social">
              <li className="h6 fw-7 text_on-surface-color">
                <a href="#" className="d-flex align-items-center gap_12">
                  <i className="icon-FacebookLogo"></i>23k Likes
                </a>
              </li>
              <li className="h6 fw-7 text_on-surface-color">
                <a href="#" className="d-flex align-items-center gap_12">
                  <i className="icon-XLogo"></i>41k Follower
                </a>
              </li>
              <li className="h6 fw-7 text_on-surface-color">
                <a href="#" className="d-flex align-items-center gap_12">
                  <i className="icon-PinterestLogo"></i>32k Follower
                </a>
              </li>
            </ul>
          </div>
          <ul id="menu-mobile-menu" className="style-1">
            <li className="menu-item menu-item-has-children-mobile">
              <a
                href="#dropdown-menu-one"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-one"
              >
                Home
              </a>
              <div
                id="dropdown-menu-one"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  <li className="menu-item">
                    <Link href={`/`}>Homepage 01</Link>
                  </li>
                  <li className="menu-item">
                    <Link href={`/homepage-2`}>Homepage 02</Link>
                  </li>
                  <li className="menu-item">
                    <Link href={`/homepage-3`}>Homepage 03</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <a href="#about" className="item-menu-mobile nav_link">
                About
              </a>
            </li>
            <li className="menu-item">
              <a href="#blog" className="item-menu-mobile nav_link">
                Blog
              </a>
            </li>
            <li className="menu-item">
              <a href="#contact" className="item-menu-mobile nav_link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
