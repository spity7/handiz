"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
import { heroSlides } from "@/data/blogs";
import { useEffect, useState } from "react";

type Props = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
};

export default function HeroSP({
  selectedCategories,
  setSelectedCategories,
  searchQuery,
  setSearchQuery,
}: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // Track dark mode by observing the class on document.body
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Initialize logic
    const checkDarkMode = () => {
      if (typeof document !== "undefined" && document.body) {
        setIsDark(document.body.classList.contains("dark-mode"));
      }
    };

    // Initial check
    checkDarkMode();

    // 2. Setup observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkMode();
        }
      });
    });

    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, {
        attributes: true, // subscribe to attribute changes
      });
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}projects`)
      .then((res) => res.json())
      .then((data) => {
        const allCategories: string[] = data.projects.flatMap((p: any) =>
          Array.isArray(p.category) ? p.category : [],
        );

        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="page-title homepage-2 sw-layout">
      <div className="tf-container w-xxl">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <form
            action="#"
            className="form-search"
            onSubmit={(e) => e.preventDefault()}
            style={{ width: "90%" }}
          >
            <fieldset className="input-search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </fieldset>
            <div className="btn-submit">
              <button
                type="submit"
                disabled={loading}
                className="tf-btn animate-hover-btn btn-switch-text"
              >
                <span>
                  <span className="btn-double-text" data-text="Search">
                    Search
                  </span>
                </span>
              </button>
            </div>
          </form>

          <a
            href="#canvasSearch"
            data-bs-toggle="offcanvas"
            className="tf-btn animate-hover-btn btn-switch-text"
            style={{ marginTop: "5px" }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
              </svg>
              <span
                className="btn-double-text"
                data-text="Filter"
                style={{ marginLeft: "4px" }}
              >
                Filter
              </span>
            </span>
          </a>
        </div>

        {/* CATEGORIES */}
        {loading && (
          <div
            style={{
              minHeight: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div className="spinner" />
            <span className="text-body-1">Loading categories…</span>
          </div>
        )}

        {!loading && categories.length > 0 && (
          <Swiper
            className="swiper sw-layout wrap-tag-categories style-1"
            spaceBetween={12}
            slidesPerView={"auto"}
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp8",
              nextEl: ".snbn8",
            }}
          >
            <div className="sw-button style-cycle text_primary-color nav-prev-layout snbp8">
              <i className="icon-CaretLeft" />
            </div>

            {categories.map((category) => {
              const isActive = selectedCategories.includes(category);

              return (
                <SwiperSlide className="swiper-slide" key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="tag h6"
                    style={{
                      // If dark mode (isDark=true): active is white bg/black text, inactive is transparent/white text
                      // If light mode (isDark=false): active is black bg/white text, inactive is transparent/black text
                      backgroundColor: isDark
                        ? isActive
                          ? "#ffffff" // Dark + Active = White BG
                          : "transparent"
                        : isActive
                          ? "#000000" // Light + Active = Black BG
                          : "transparent",
                      color: isDark
                        ? isActive
                          ? "#000000" // Dark + Active = Black Text
                          : "#ffffff" // Dark + Inactive = White Text
                        : isActive
                          ? "#ffffff" // Light + Active = White Text
                          : "#000000", // Light + Inactive = Black Text
                      border: isDark ? "1px solid white" : "1px solid black",
                    }}
                  >
                    {category}
                  </button>
                </SwiperSlide>
              );
            })}

            <div className="sw-button style-cycle text_primary-color nav-next-layout snbn8">
              <i className="icon-CaretRight" />
            </div>
          </Swiper>
        )}
      </div>
    </div>
  );
}
