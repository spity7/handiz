"use client";
import Link from "next/link";
import Image from "next/image";
import {
  largeFeatureCompetitions,
  largeFeaturePosts,
  listStyleCompetitions,
  listStylePosts,
} from "@/data/blogs";
import React, { useCallback, useState } from "react";

export default function EditorsPicCompetition() {
  const [openVideo, setOpenVideo] = useState(-1);
  const toggleVideo = useCallback((index: number) => {
    setOpenVideo((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <div className="section-editor-pick mt_22 mb_27">
      <div className="tf-container">
        <div className="heading-section mb_27">
          <h3>Competitions</h3>
        </div>

        <div className="row wrap">
          <div className="col-lg-6">
            {largeFeatureCompetitions.map((post, index) => (
              <div
                className="feature-post-item style-default hover-image-translate item-grid"
                key={index}
              >
                <div className="img-style mb_28">
                  <Image
                    className="lazyload"
                    decoding="async"
                    loading="lazy"
                    sizes="(max-width: 885px) 100vw, 885px"
                    width={885}
                    height={664}
                    alt="feature post"
                    src={post.imgSrc}
                  />{" "}
                  <div className="wrap-tag">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-caption-2 text_white"
                    >
                      {post.category}
                    </Link>
                    <div className="tag time text-caption-2 text_white">
                      <i className="icon-Timer" /> 4 Mins read
                    </div>{" "}
                  </div>
                  <Link
                    href={`/single-post-1/${post.id}`}
                    className="overlay-link"
                  />
                </div>
                <div className="content">
                  <div className="wrap-meta d-flex justify-content-between mb_16">
                    <ul className="meta-feature fw-7 d-flex text-body-1">
                      {/* <li>{post.date}</li> */}
                      <li>
                        <span className="text_secodary2-color">
                          REGISTRATION DEADLINE:{" "}
                        </span>
                        <a href="#" className="link">
                          January 15, 2025
                        </a>
                      </li>
                    </ul>
                    {/* <ul className="meta-feature interact fw-7 d-flex text-body-1">
                      <li>
                        <i className="icon-Eye" />
                        {post.views}
                      </li>
                      <li>
                        <i className="icon-ChatsCircle" />
                        {post.comments}
                      </li>
                    </ul> */}
                  </div>
                  <h2 className="title mb_20">
                    <Link
                      href={`/single-post-1/${post.id}`}
                      className="link line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-body-1 mb_28 line-clamp-2">
                    {post.excerpt}
                  </p>
                  {/* <Link
                    href={`/single-post-1/${post.id}`}
                    className="hover-underline-link text-body-1 fw-7 text_on-surface-color"
                  >
                    Read More Post
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            {listStyleCompetitions.map((post, index) => (
              <div
                className="feature-post-item style-list v2 hover-image-translate"
                key={index}
              >
                <div className="img-style">
                  <Image
                    className={`lazyload ${openVideo == index ? "hide" : ""} `}
                    decoding="async"
                    loading="lazy"
                    sizes="(max-width: 400px) 100vw, 400px"
                    width={400}
                    height={300}
                    alt="feature post"
                    src={post.imgSrc}
                  />
                  <div className="wrap-tag">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-caption-2 text_white"
                    >
                      {post.category}
                    </Link>
                    <div className="tag time text-caption-2 text_white">
                      <i className="icon-Timer" /> 4 Mins read
                    </div>
                  </div>
                  {post.hasVideo && (
                    <>
                      <button
                        className={`video_btn_play ${
                          openVideo == index ? "active" : ""
                        } `}
                        aria-label="Play / Pause"
                        onClick={() =>
                          toggleVideo(openVideo == index ? -1 : index)
                        }
                      >
                        {openVideo == index ? (
                          <i className="icon-pause pause" />
                        ) : (
                          <i className="icon-play-filled" />
                        )}

                        <span className="pause" />
                      </button>
                      <div
                        className="tf-video"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {openVideo == index && post.hasVideo && (
                          <iframe
                            width="860"
                            height="515"
                            src={`${post.videoURL}&autoplay=1`}
                            title="YouTube video player"
                            allow="autoplay"
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        )}
                      </div>
                    </>
                  )}

                  <Link
                    href={`/single-post-1/${post.id}`}
                    className="overlay-link"
                  />
                </div>

                <div className="content">
                  <ul className="meta-feature fw-7 d-flex mb_12 text-caption-2 text-uppercase">
                    {/* <li>{post.date}</li> */}
                    <li>
                      <span className="text_secodary2-color">
                        REGISTRATION DEADLINE:{" "}
                      </span>
                      <a href="#" className="link">
                        January 15, 2025
                      </a>
                    </li>
                  </ul>
                  <h5 className="title mb_16">
                    <Link
                      href={`/single-post-1/${post.id}`}
                      className="link line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </h5>
                  <p className="text-body-1 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
