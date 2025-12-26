"use client";
import { useEffect, useState } from "react";
import { pages, policies, quickLinks } from "@/data/footerLinks";
import { categoryLinks2 } from "@/data/menu";
import NewsLetterForm from "../common/NewsLetterForm";
import Link from "next/link";

export default function Footer1({
  parentClass = "tf-container tf-spacing-8 pt-0",
  type = 1,
}) {
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleBlock = (key: string) => {
    if (!isMobile) return; // disable toggle on desktop
    setOpenBlocks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // If desktop => everything open
  const getContentStyle = (key: string) => {
    if (!isMobile) {
      return { height: "auto" };
    }
    return {
      height: openBlocks[key] ? "auto" : "0px",
      overflow: "hidden",
      transition: "height 0.3s ease",
    };
  };

  return (
    <div className={parentClass}>
      <footer
        className={`footer ${type == 2 ? "style-1" : ""} ${
          type == 3 ? "style-1" : ""
        }`}
      >
        <div className="footer-body">
          {/* Logo + About */}
          <div className="footer-about footer-item">
            <Link href={`/`} className="site-logo mb_20">
              <img
                alt="logo"
                className="main-logo light-mode-logo"
                src="/images/logo/logo.svg"
                width={194}
                height={44}
              />
              <img
                alt="logo"
                className="main-logo dark-mode-logo"
                src="/images/logo/logo-dark.svg"
                width={194}
                height={44}
              />
            </Link>
            <p className="text-caption-1 mb_28">
              Welcome to your go-to destination for insightful news! Discover
              carefully selected articles that inform, inspire.
            </p>
            <ul className="tf-social d-flex">
              <li>
                <a href="#" className="icon-FacebookLogo" />
              </li>
              <li>
                <a href="#" className="icon-XLogo" />
              </li>
              <li>
                <a href="#" className="icon-PinterestLogo" />
              </li>
              <li>
                <a href="#" className="icon-InstagramLogo" />
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="footer-content footer-item">
            {/* Quick Links */}
            <div className="footer-col-block page-link">
              <h6
                className="footer-heading footer-heading-mobile text_color-1 mb_16"
                onClick={() => toggleBlock("quick")}
                style={{ cursor: isMobile ? "pointer" : "default" }}
              >
                Quick Link
              </h6>
              <div
                className="tf-collapse-content"
                style={getContentStyle("quick")}
              >
                <ul className="footer-menu-list d-grid gap_12">
                  {quickLinks.map((item, index) => (
                    <li className="text-caption-1" key={index}>
                      <Link href={item.href} className="link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="footer-col-block page-link">
              <h6
                className="footer-heading footer-heading-mobile text_color-1 mb_16"
                onClick={() => toggleBlock("categories")}
                style={{ cursor: isMobile ? "pointer" : "default" }}
              >
                Categories
              </h6>
              <div
                className="tf-collapse-content"
                style={getContentStyle("categories")}
              >
                <ul className="footer-menu-list d-grid gap_12">
                  {categoryLinks2.slice(0, 5).map(({ href, label, slug }) => (
                    <li className="text-caption-1" key={slug}>
                      <Link href={`${href}/${slug}`} className="link">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Useful Links */}
            {!(type == 2) && (
              <div className="footer-col-block page-link">
                <h6
                  className="footer-heading footer-heading-mobile text_color-1 mb_16"
                  onClick={() => toggleBlock("useful")}
                  style={{ cursor: isMobile ? "pointer" : "default" }}
                >
                  Useful Links
                </h6>
                <div
                  className="tf-collapse-content"
                  style={getContentStyle("useful")}
                >
                  <ul className="footer-menu-list d-grid gap_12">
                    {pages.map((page, index) => (
                      <li className="text-caption-1" key={index}>
                        <a href="#" className="link">
                          {page.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Newsletter */}
          {!(type == 3) && (
            <div className="footer-newsletter footer-item">
              <h6 className="footer-title mb_20">
                Subscribe for all the top news!
              </h6>
              <NewsLetterForm />
              <div className="box-fieldset-item d-flex">
                <fieldset className="d-flex gap_12">
                  <input type="checkbox" className="tf-check" id="note" />
                </fieldset>
                <p className="text-body-1">
                  By clicking the Subscribe button, you acknowledge that you
                  have read and agree to our{" "}
                  <a href="#" className="fw-7 text_on-surface-color">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="fw-7 text_on-surface-color">
                    Terms Of Use
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom d-flex align-items-center justify-content-between">
          <p className="text-caption-1">
            {new Date().getFullYear()} Drozy. All Rights Reserved.
          </p>
          <ul className="list d-flex">
            {policies.map((item, index) => (
              <li className="text-caption-1" key={index}>
                <a href="#" className="link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
