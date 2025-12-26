"use client";
import Link from "next/link";
import Image from "next/image";
import { categoryItems } from "@/data/categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function Categories() {
  return (
    <div className="section-categories sw-layout">
      <div className="tf-container w-xxl">
        <div className="heading-section d-flex justify-content-between mb_26">
          <h3>Top Categories</h3>
          <div className="wrap-sw-button d-flex gap_12 md-hide">
            <div className="sw-button sz-56 v2 style-cycle nav-prev-layout snbp7">
              <i className="icon-CaretLeft" />
            </div>
            <div className="sw-button sz-56 v2 style-cycle nav-next-layout snbn7">
              <i className="icon-CaretRight" />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd7",
          }}
          navigation={{
            prevEl: ".snbp7",
            nextEl: ".snbn7",
          }}
        >
          {categoryItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="categoires-item hover-image">
                <Link href={`/categories-1`} className="img-style mb_17">
                  <Image
                    className="lazyload"
                    decoding="async"
                    loading="lazy"
                    sizes="(max-width: 212px) 100vw, 212px"
                    width={212}
                    height={158}
                    alt="feature post"
                    src={item.img}
                  />
                </Link>
                <div className="content">
                  <h6 className="mb_2">
                    <Link href={`/categories-1`} className="link">
                      {item.title}
                    </Link>
                  </h6>
                  <p className="text-caption-1">{item.posts} Posts</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dots sw-pagination-layout mt_22 justify-content-center d-flex d-md-none spd7" />
        </Swiper>
      </div>
    </div>
  );
}
