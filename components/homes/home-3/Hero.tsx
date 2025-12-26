"use client";
import Link from "next/link";
import Image from "next/image";
import { heroBanners2, miniFeatures } from "@/data/blogs";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
export default function Hero() {
  return (
    <div className="page-title homepage-3">
      <div className="tf-container w-xl">
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
          navigation={{
            prevEl: ".snbp11",
            nextEl: ".snbn11",
          }}
        >
          {heroBanners2.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="hero-banner style-1">
                <div className="img-thumbs">
                  <Image
                    priority
                    width={1410}
                    height={680}
                    alt="page-title"
                    src={item.imgSrc}
                  />
                  <Link
                    href={`/single-post-1/${item.id}`}
                    className="overlay-link"
                  />
                </div>
                <div className="content cs-entry__content">
                  <div className="content__body">
                    {item.showInteractions && (
                      <div className="wrap-meta d-flex justify-content-between mb_20">
                        <ul className="meta-feature interact fw-7 d-flex h6 text_white">
                          <li>
                            <i className="icon-Eye" />
                            {item.views}
                          </li>
                          <li>
                            <i className="icon-ChatsCircle" />
                            {item.comments}
                          </li>
                        </ul>
                      </div>
                    )}
                    <h1 className="text_white mb_20">
                      <Link
                        href={`/single-post-1/${item.id}`}
                        className="hover-line-text"
                      >
                        {item.title}
                      </Link>
                    </h1>
                    <div className="wrap d-flex align-items-center gap_12">
                      <Link
                        href={`/categories-1`}
                        className="tag categories text-title text_white"
                      >
                        {item.category}
                      </Link>
                      <ul className="meta-feature fw-7 d-flex h6 text_white">
                        <li>{item.date}</li>
                        <li>
                          <span>POST BY</span>
                          <a href="#" className="link">
                            {item.author}
                          </a>
                        </li>
                      </ul>
                    </div>
                    {item.excerpt && (
                      <p className="text_white mt_16">{item.excerpt}</p>
                    )}
                  </div>
                  <div className="content__top d-flex justify-content-between">
                    <div className="tag time text-caption-2 text_white">
                      <i className="icon-Timer" /> {item.readTime}
                    </div>
                  </div>
                  <div className="wrap-feature">
                    {miniFeatures.map((item, index) => (
                      <div className="item hover-image-rotate" key={index}>
                        <Link
                          href={`/single-post-1/${item.id}`}
                          className="img-style"
                        >
                          <Image
                            decoding="async"
                            loading="lazy"
                            width={120}
                            height={120}
                            alt="feature"
                            src={item.imgSrc}
                          />
                        </Link>
                        <div>
                          <h6 className="text_white mb_12">
                            <Link
                              href={`/single-post-1/${item.id}`}
                              className="link line-clamp-2"
                            >
                              {item.title}
                            </Link>
                          </h6>
                          <div className="d-flex align-items-center gap_12">
                            <Link
                              href={`/categories-1`}
                              className="tag categories text_white"
                            >
                              {item.category}
                            </Link>
                            <div className="text-caption-2 text_white text-uppercase">
                              {item.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-button style-1 sw-single-prev snbp11">
            <i className="icon-CaretLeft" />
          </div>
          <div className="sw-button style-1 sw-single-next snbn11">
            <i className="icon-CaretRight" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
