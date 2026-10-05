"use client";

import type { HomepageAd } from "@/lib/homepageAds";
import {
  getHomepageAdStatusClassName,
  getHomepageAdStatusLabel,
  isHomepageAdClickable,
  normalizeHomepageAdStatus,
} from "@/lib/homepageAdStatus";
import Image from "next/image";

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string>,
    ) => void;
  }
}

type Props = {
  ad: HomepageAd;
};

function AdThumbnail({
  title,
  thumbnailUrl,
}: {
  title: string;
  thumbnailUrl: string;
}) {
  return (
    <span className="img-style homepage-ad-card__thumb">
      <Image
        decoding="async"
        loading="lazy"
        width={123}
        height={92}
        alt={title}
        src={thumbnailUrl}
        className="homepage-ad-card__image"
      />
    </span>
  );
}

export default function AdStripCard({ ad }: Props) {
  const status = normalizeHomepageAdStatus(ad.status);
  const clickable = isHomepageAdClickable(status);
  const statusLabel = getHomepageAdStatusLabel(status);
  const statusClass = getHomepageAdStatusClassName(status);

  const handleClick = () => {
    if (!clickable) return;
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "homepage_ad_click", {
      ad_id: ad._id,
      url: ad.externalUrl,
    });
  };

  const content = (
    <>
      {ad.thumbnailUrl ? (
        <AdThumbnail title={ad.title} thumbnailUrl={ad.thumbnailUrl} />
      ) : null}
      <span className="content">
        <ul className="meta-feature text-caption-2 fw-7 d-flex align-items-center mb_8 text-uppercase">
          <li>
            <span className={statusClass}>{statusLabel}</span>
          </li>
          {ad.metaSecondary ? (
            <li>
              <span className="text_secodary-color text-uppercase">
                {ad.metaSecondary}
              </span>
            </li>
          ) : null}
        </ul>
        <h6 className="title">
          <span className="link line-clamp-2">{ad.title}</span>
        </h6>
      </span>
    </>
  );

  const className = [
    "feature-post-item style-small d-flex align-items-center homepage-ad-card",
    clickable ? "hover-image-rotate" : "homepage-ad-card--disabled",
  ].join(" ");

  if (!clickable) {
    return (
      <div
        className={className}
        role="group"
        aria-label={`${statusLabel}: ${ad.title}`}
        aria-disabled="true"
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={ad.externalUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={handleClick}
      aria-label={`${statusLabel}: ${ad.title}`}
    >
      {content}
    </a>
  );
}
