"use client";
import Link from "next/link";
import Image from "next/image";
import { featurePosts, heroBanners } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
import Blogcard2 from "@/components/blog-cards/Blogcard2";
export default function Hero() {
  return (
    <div className="page-title homepage-1 sw-layout">
      <div className="tf-container">
        <Swiper
          className="swiper wrap-feature"
          spaceBetween={15}
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
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd3",
          }}
        >
          {featurePosts.map((post, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Blogcard2 post={post} />
            </SwiperSlide>
          ))}

          <div className="sw-dots sw-pagination-layout mt_24 justify-content-center d-flex mt_22 spd3" />
        </Swiper>
        <Swiper
          className="swiper sw-single animation-sl"
          modules={[EffectCreative, Parallax, Navigation, Pagination]}
          parallax={true}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          pagination={{
            clickable: true,
            el: ".spd4",
          }}
          navigation={{
            prevEl: ".snbp4",
            nextEl: ".snbn4",
          }}
        >
          {heroBanners.map((banner, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="hero-banner style-default">
                <div className="img-thumbs">
                  <Image
                    width={1800}
                    height={700}
                    alt="page-title"
                    src={banner.imgSrc}
                    priority
                  />
                  <Link
                    href={`/single-post-1/${banner.id}`}
                    className="overlay-link"
                  />
                </div>
                <div
                  className="content cs-entry__content"
                  data-swiper-parallax="-400"
                  data-swiper-parallax-duration="800"
                >
                  <div className="content__top d-flex justify-content-between">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-title text_white"
                    >
                      {banner.category}
                    </Link>
                    <div className="tag time text-title text_white">
                      <i className="icon-Timer" /> {banner.readTime}
                    </div>
                  </div>
                  <div className="content__body">
                    <div className="wrap-meta d-flex justify-content-between mb_16">
                      <ul className="meta-feature fw-7 d-flex h6 text_white">
                        <li>{banner.date}</li>
                        <li>
                          <span>POST BY</span>
                          <a href="#" className="link">
                            {banner.author}
                          </a>
                        </li>
                      </ul>
                      {banner.showInteractions && (
                        <ul className="meta-feature interact fw-7 d-flex h6 text_white">
                          <li>
                            <i className="icon-Eye" />
                            {banner.views}
                          </li>
                          <li>
                            <i className="icon-ChatsCircle" />
                            {banner.comments}
                          </li>
                        </ul>
                      )}
                    </div>
                    <h1 className="text_white mb_24">
                      <Link
                        href={`/single-post-1/${banner.id}`}
                        className="hover-line-text"
                      >
                        {banner.title}
                      </Link>
                    </h1>
                    <p className="text_white line-clamp-2">{banner.excerpt}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-button style-1 sw-single-prev md-hide snbp4">
            <i className="icon-CaretLeft" />
          </div>
          <div className="sw-button style-1 sw-single-next md-hide snbn4">
            <i className="icon-CaretRight" />
          </div>
          <div className="sw-dots sw-pagination-single justify-content-center d-flex d-md-none spd4" />
        </Swiper>
      </div>
    </div>
  );
}
