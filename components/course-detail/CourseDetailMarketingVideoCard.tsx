"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CourseMarketingVideo } from "@/types/course";
import {
  buildChromelessEmbedUrl,
  canEmbedMarketingVideo,
  getMarketingVideoThumbnailFallbacks,
  getMarketingVideoThumbnailUrl,
  isPortraitMarketingVideo,
} from "@/lib/courseMarketingVideos";

type CourseDetailMarketingVideoCardProps = {
  video: CourseMarketingVideo;
  videoIndex: number;
  fallbackThumbnail?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
};

export default function CourseDetailMarketingVideoCard({
  video,
  videoIndex,
  fallbackThumbnail,
  isPlaying,
  onTogglePlay,
}: CourseDetailMarketingVideoCardProps) {
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
  }, [video.url, video.thumbnailUrl, fallbackThumbnail]);

  const handleToggle = () => {
    if (!embeddable) {
      window.open(video.url, "_blank", "noopener,noreferrer");
      return;
    }

    onTogglePlay();
  };

  const onThumbnailError = () => {
    setThumbnailIndex((current) =>
      current + 1 < thumbnailFallbacks.length ? current + 1 : current,
    );
  };

  const embedSrc = video.embedUrl
    ? buildChromelessEmbedUrl(
        video.embedUrl,
        typeof window !== "undefined" ? window.location.origin : undefined,
      )
    : "";

  return (
    <article className="feature-post-item style-default course-detail-preview__card course-detail-preview__grid-cell course-detail-preview__card--media-only">
      <div
        className={`img-style course-detail-preview__media${isPlaying ? " course-detail-preview__media--playing" : ""}`}
      >
        {isPlaying && embeddable && embedSrc ? (
          <button
            type="button"
            className="course-detail-preview__player-trigger"
            aria-label={stopLabel}
            onClick={handleToggle}
          >
            <div
              className={`course-detail-preview__player${isPortrait ? " course-detail-preview__player--portrait" : ""}`}
            >
              <iframe
                src={embedSrc}
                title={playLabel}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                tabIndex={-1}
              />
            </div>
          </button>
        ) : (
          <button
            type="button"
            className="course-detail-preview__media-trigger"
            aria-label={playLabel}
            onClick={handleToggle}
          >
            <Image
              className="lazyload course-detail-preview__thumb"
              src={thumbnail}
              alt=""
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1399px) 20vw, 14vw"
              onError={onThumbnailError}
            />
          </button>
        )}
      </div>
    </article>
  );
}
