"use client";
import Link from "next/link";

import { categories } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function CategoriSlider() {
  return (
    <Swiper
      className="swiper sw-layout wrap-tag-categories"
      slidesPerView={"auto"}
      spaceBetween={12}
      modules={[Navigation]}
      navigation={{
        prevEl: ".snbp2",
        nextEl: ".snbn2",
      }}
    >
      <div className="sw-button style-default text_primary-color nav-prev-layout snbp2">
        <i className="icon-CaretLeft" />
      </div>
      {categories.map((category, i) => (
        <SwiperSlide key={i} className="swiper-slide">
          <Link
            href={`/categories-1`}
            className="tag text_on-surface-color text-body-2"
          >
            {category}
          </Link>
        </SwiperSlide>
      ))}
      <div className="sw-button style-default text_primary-color nav-next-layout snbn2">
        <i className="icon-CaretRight" />
      </div>
    </Swiper>
  );
}
