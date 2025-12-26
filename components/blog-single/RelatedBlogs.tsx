"use client";

import { featurePosts4 } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import BlogCard1 from "../blog-cards/BlogCard1";

export default function RelatedBlogs() {
  return (
    <div className="tf-container sw-layout tf-spacing-8">
      <h3 className="mb_28">Related Post</h3>
      <Swiper
        className="swiper"
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd1",
        }}
      >
        {featurePosts4.map((post, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <BlogCard1 post={post} />
          </SwiperSlide>
        ))}

        <div className="sw-dots sw-pagination-layout mt_22 justify-content-center d-flex spd1" />
      </Swiper>
    </div>
  );
}
