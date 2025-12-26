"use client";
import Link from "next/link";
import Image from "next/image";
import { mostPopularPosts } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function PopularBlogs() {
  return (
    <div className="section-most-popular-3 sw-layout">
      <div className="tf-container w-xl">
        <div className="heading-section d-flex justify-content-between mb_26">
          <h3>Most Popular</h3>
          <div className="wrap-sw-button d-flex gap_12 md-hide">
            <div className="sw-button sz-56 v2 style-cycle nav-prev-layout snbp12">
              <i className="icon-CaretLeft" />
            </div>
            <div className="sw-button sz-56 v2 style-cycle nav-next-layout snbn12">
              <i className="icon-CaretRight" />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd12",
          }}
          navigation={{
            prevEl: ".snbp12",
            nextEl: ".snbn12",
          }}
        >
          {mostPopularPosts.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="feature-post-item style-position v2 hover-image-translate item-grid">
                <div className="img-style">
                  <Image
                    decoding="async"
                    loading="lazy"
                    width={330}
                    height={440}
                    alt="most-popular"
                    src={item.imgSrc}
                  />
                  <Link
                    href={`/single-post-1/${item.id}`}
                    className="overlay-link"
                  />
                </div>
                <div className="content">
                  <div className="heading-title">
                    <h5 className="title mb_20 text_white">
                      <Link
                        href={`/single-post-1/${item.id}`}
                        className="link line-clamp-3"
                      >
                        {item.title}
                      </Link>
                    </h5>
                  </div>
                  <div className="wrap-meta d-flex align-items-center gap_12">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-caption-2 text_white"
                    >
                      {item.category}
                    </Link>
                    <ul className="meta-feature fw-7 text-caption-2 text_white text-uppercase">
                      <li>{item.date}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dots sw-pagination-layout mt_22 justify-content-center d-flex d-md-none spd12" />
        </Swiper>
      </div>
    </div>
  );
}
