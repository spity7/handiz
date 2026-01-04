"use client";

import Link from "next/link";
import Image from "next/image";
import { largeFeatureCompetitions, listStyleCompetitions } from "@/data/blogs";
import React, { useCallback, useState, useEffect } from "react";
import type { Competition } from "@/types/competitions";

export default function EditorsPicCompetition() {
  const [side1, setSide1] = useState<Competition[]>([]);
  const [side2, setSide2] = useState<Competition[]>([]);
  const [openVideo, setOpenVideo] = useState(-1);

  const toggleVideo = useCallback((index: number) => {
    setOpenVideo((prev) => (prev === index ? -1 : index));
  }, []);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}competitions`
        );
        const data = await res.json();

        const competitions: Competition[] = data.competitions;

        // sort by order
        const sorted = competitions.sort((a, b) => a.order - b.order);

        // split by side
        setSide1(sorted.filter((c) => c.side === "1"));
        setSide2(sorted.filter((c) => c.side === "2"));
      } catch (error) {
        console.error("Failed to fetch competitions", error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="section-editor-pick mt_22 mb_27">
      <div className="tf-container">
        <div className="heading-section mb_27">
          <h3>Competitions</h3>
        </div>

        <div className="row wrap">
          <div className="col-lg-6">
            {side1.map((post, index) => (
              <div
                className="feature-post-item style-default hover-image-translate item-grid"
                key={post._id}
              >
                <div className="img-style mb_28">
                  <Image
                    className="lazyload"
                    decoding="async"
                    loading="lazy"
                    sizes="(max-width: 885px) 100vw, 885px"
                    width={885}
                    height={664}
                    alt={post.title}
                    src={post.thumbnailUrl}
                  />

                  <div className="wrap-tag">
                    <Link
                      href={"#"}
                      className="tag categories text-caption-2 text_white"
                    >
                      {post.category}
                    </Link>
                    <div className="tag time text-caption-2 text_white">
                      {post.prize}
                    </div>
                  </div>

                  <Link
                    href={post.link}
                    className="overlay-link"
                    target="_blank"
                  />
                </div>

                <div className="content">
                  <div className="wrap-meta d-flex justify-content-between mb_16">
                    <ul className="meta-feature fw-7 d-flex text-body-1">
                      <li>
                        <span className="text_secodary2-color">
                          REGISTRATION DEADLINE:
                        </span>{" "}
                        {post.deadline}
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
                      href={post.link}
                      className="link line-clamp-2"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-body-1 mb_28 line-clamp-2">
                    {post.description.replace(/<[^>]+>/g, "")}
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
            {side2.map((post, index) => (
              <div
                className="feature-post-item style-list v2 hover-image-translate"
                key={post._id}
              >
                <div className="img-style">
                  <Image
                    className={`lazyload ${openVideo == index ? "hide" : ""} `}
                    decoding="async"
                    loading="lazy"
                    sizes="(max-width: 400px) 100vw, 400px"
                    width={400}
                    height={300}
                    alt={post.title}
                    src={post.thumbnailUrl}
                  />

                  <div className="wrap-tag">
                    <Link
                      href={"#"}
                      className="tag categories text-caption-2 text_white"
                    >
                      {post.category}
                    </Link>
                    <div className="tag time text-caption-2 text_white">
                      {post.prize}
                    </div>
                  </div>

                  <Link
                    href={post.link}
                    className="overlay-link"
                    target="_blank"
                  />
                </div>

                <div className="content">
                  <ul className="meta-feature fw-7 d-flex mb_12 text-caption-2 text-uppercase">
                    {/* <li>{post.date}</li> */}
                    <li>
                      <span className="text_secodary2-color">
                        REGISTRATION DEADLINE:
                      </span>{" "}
                      <a href="#" className="link">
                        {post.deadline}
                      </a>
                    </li>
                  </ul>

                  <h5 className="title mb_16">
                    <Link
                      href={post.link}
                      className="link line-clamp-2"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                  </h5>

                  <p className="text-body-1 line-clamp-2">
                    {post.description.replace(/<[^>]+>/g, "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
