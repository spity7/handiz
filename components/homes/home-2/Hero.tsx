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
export default function Hero() {
  return (
    <div className="page-title homepage-2 sw-layout">
      <div className="tf-container w-xxl">
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
        <div className="row">
          <div className="col-lg-9">
            <Swiper
              className="swiper sw-single animation-sl"
              modules={[EffectCreative, Parallax, Navigation, Pagination]}
              pagination={{
                clickable: true,
                el: ".spd9",
              }}
              navigation={{
                prevEl: ".snbp9",
                nextEl: ".snbn9",
              }}
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
            >
              {heroSlides.map((slide, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="hero-banner style-default v2">
                    <div className="img-thumbs">
                      <Image
                        className="lazyload"
                        priority
                        width={1163}
                        height={680}
                        sizes="(max-width: 1163px) 100vw, 1163px"
                        alt="page-title"
                        src={slide.imgSrc}
                      />
                      <Link
                        href={`/single-post-1/${slide.id}`}
                        className="overlay-link"
                      />
                    </div>
                    <div
                      className="content cs-entry__content "
                      data-swiper-parallax="-400"
                      data-swiper-parallax-duration="800"
                    >
                      <div className="content__top d-flex justify-content-between">
                        <Link
                          href={`/categories-1`}
                          className="tag categories text-title text_white"
                        >
                          {slide.category}
                        </Link>
                        <div className="tag time text-title text_white">
                          <i className="icon-Timer" /> 4 Mins read
                        </div>
                      </div>
                      <div className="content__body">
                        <div className="wrap-meta d-flex justify-content-between mb_16">
                          <ul className="meta-feature fw-7 d-flex h6 text_white">
                            <li>{slide.date}</li>
                            <li>
                              <span>POST BY</span>
                              <a href="#" className="link">
                                {slide.author}
                              </a>
                            </li>
                          </ul>
                          {slide.showInteractions && (
                            <ul className="meta-feature interact fw-7 d-flex h6 text_white">
                              <li>
                                <i className="icon-Eye" />
                                {slide.views}
                              </li>
                              <li>
                                <i className="icon-ChatsCircle" />
                                {slide.comments}
                              </li>
                            </ul>
                          )}
                        </div>
                        <h1 className="text_white mb_24">
                          <Link
                            href={`/single-post-1/${slide.id}`}
                            className="hover-line-text"
                          >
                            {slide.title}
                          </Link>
                        </h1>
                        <p className="text_white">{slide.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-button style-1 sw-single-prev md-hide snbp9">
                <i className="icon-CaretLeft" />
              </div>
              <div className="sw-button style-1 sw-single-next md-hide snbn9">
                <i className="icon-CaretRight" />
              </div>
              <div className="sw-dots style-1 sw-pagination-single justify-content-center d-flex d-md-none spd9" />
            </Swiper>
          </div>
          <div className="col-lg-3">
            <div className="box-author style-1 v2 text-center">
              <h5 className="heading-title">Wellcome To Drozy</h5>
              <div className="info">
                <div className="avatar mb_12">
                  <Image
                    alt="avatar"
                    src="/images/avatar/main-avatar.jpg"
                    width={400}
                    height={400}
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
                    <i className="icon-FacebookLogo" />
                    23k Likes
                  </a>
                </li>
                <li className="h6 fw-7 text_on-surface-color">
                  <a href="#" className="d-flex align-items-center gap_12">
                    <i className="icon-XLogo" />
                    41k Follower
                  </a>
                </li>
                <li className="h6 fw-7 text_on-surface-color">
                  <a href="#" className="d-flex align-items-center gap_12">
                    <i className="icon-PinterestLogo" />
                    32k Follower
                  </a>
                </li>
              </ul>
              <p>Lifestyle blogger who writes about mindful living.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
