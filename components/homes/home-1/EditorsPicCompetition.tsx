"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback, useState, useEffect } from "react";
import type { Competition } from "@/types/competitions";
import CompetitionsPageSkeleton from "@/components/skeletons/CompetitionsPageSkeleton";
import { fetchCompetitions, splitCompetitionsBySide } from "@/lib/competitions";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

export default function EditorsPicCompetition() {
  const [side1, setSide1] = useState<Competition[]>([]);
  const [side2, setSide2] = useState<Competition[]>([]);
  const [openVideo, setOpenVideo] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const toggleVideo = useCallback((index: number) => {
    setOpenVideo((prev) => (prev === index ? -1 : index));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setLoadFailed(false);

      try {
        const { competitions, ok } = await fetchCompetitions();
        if (cancelled) return;
        if (!ok) {
          setLoadFailed(true);
          return;
        }
        const { side1: s1, side2: s2 } = splitCompetitionsBySide(competitions);
        setSide1(s1);
        setSide2(s2);
      } catch {
        if (!cancelled) setLoadFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const isEmpty = !loading && side1.length === 0 && side2.length === 0;

  return (
    <div className="section-editor-pick mt_22 mb_27">
      <div className="tf-container">
        <div className="heading-section mb_27">
          <h3>Competitions</h3>
        </div>

        {loading ? (
          <CompetitionsPageSkeleton />
        ) : loadFailed ? (
          <p className="text-body-1 text-muted">
            Competitions are unavailable right now. Please try again later.
          </p>
        ) : isEmpty ? (
          <p className="text-body-1 text-muted">
            No competitions listed at the moment. Check back soon.
          </p>
        ) : (
          <div className="row wrap">
            <div className="col-lg-6">
              {side1.map((post) => (
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
                        href="#"
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
                      {stripHtml(post.description)}
                    </p>
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
                      className={`lazyload ${
                        openVideo == index ? "hide" : ""
                      } `}
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
                        href="#"
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
                      <li>
                        <span className="text_secodary2-color">
                          REGISTRATION DEADLINE:
                        </span>{" "}
                        <span>{post.deadline}</span>
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
                      {stripHtml(post.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
