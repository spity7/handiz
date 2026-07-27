"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CourseMarketingVideo } from "@/types/course";
import {
  canEmbedMarketingVideo,
  getMarketingVideoThumbnailFallbacks,
  getMarketingVideoThumbnailUrl,
  isPortraitMarketingVideo,
} from "@/lib/courseMarketingVideos";

type CourseDetailMarketingVideoCardProps = {
  video: CourseMarketingVideo;
  videoIndex: number;
  fallbackThumbnail?: string;
};

export default function CourseDetailMarketingVideoCard({
  video,
  videoIndex,
  fallbackThumbnail,
}: CourseDetailMarketingVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embeddable = canEmbedMarketingVideo(video);
  const isPortrait = isPortraitMarketingVideo(video);
  const thumbnailFallbacks = useMemo(
    () => getMarketingVideoThumbnailFallbacks(video, fallbackThumbnail),
    [fallbackThumbnail, video],
  );
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const thumbnail =
    thumbnailFallbacks[thumbnailIndex] ??
    getMarketingVideoThumbnailUrl(video, fallbackThumbnail);
  const playLabel = `Play preview video ${videoIndex + 1}`;
  const stopLabel = `Stop preview video ${videoIndex + 1}`;

  useEffect(() => {
    setThumbnailIndex(0);
    setIsPlaying(false);
  }, [video.url, video.thumbnailUrl, fallbackThumbnail]);

  const startVideo = () => {
    if (embeddable) {
      setIsPlaying(true);
      return;
    }
    window.open(video.url, "_blank", "noopener,noreferrer");
  };

  const stopVideo = () => {
    setIsPlaying(false);
  };

  const onThumbnailError = () => {
    setThumbnailIndex((current) =>
      current + 1 < thumbnailFallbacks.length ? current + 1 : current,
    );
  };

  return (
    <article className="feature-post-item style-default course-detail-preview__card course-detail-preview__grid-cell course-detail-preview__card--media-only">
      <div
        className={`img-style course-detail-preview__media${isPlaying ? " course-detail-preview__media--playing" : ""}`}
      >
        {isPlaying && embeddable && video.embedUrl ? (
          <div
            className={`course-detail-preview__player${isPortrait ? " course-detail-preview__player--portrait" : ""}`}
          >
            <iframe
              src={`${video.embedUrl}?autoplay=1`}
              title={playLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <button
              type="button"
              className="course-detail-preview__player-stop btn-close btn-close-white"
              aria-label={stopLabel}
              onClick={stopVideo}
            />
          </div>
        ) : (
          <>
            <Image
              className="lazyload course-detail-preview__thumb"
              src={thumbnail}
              alt=""
              width={0}
              height={0}
              sizes="(max-width: 767px) 50vw, 25vw"
              style={{ width: "100%", height: "auto" }}
              onError={onThumbnailError}
            />
            <button
              type="button"
              className="video_btn_play"
              aria-label={playLabel}
              onClick={startVideo}
            >
              <i className="icon-play-filled play" />
            </button>
          </>
        )}
      </div>
    </article>
  );
}
