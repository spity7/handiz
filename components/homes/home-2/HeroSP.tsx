"use client";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
import { heroSlides } from "@/data/blogs";

export default function HeroSP() {
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
                placeholder="Searching...."
              />
            </fieldset>
            <div className="btn-submit">
              <button
                type="submit"
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
          {categories.map((category, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                href={`/categories-1`}
                className="tag text_on-surface-color h6"
              >
                {category}
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-button style-cycle text_primary-color nav-next-layout snbn8">
            <i className="icon-CaretRight" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
