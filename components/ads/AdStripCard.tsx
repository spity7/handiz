"use client";

import type { HomepageAd } from "@/lib/homepageAds";
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

export default function AdStripCard({ ad }: Props) {
  const handleClick = () => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "homepage_ad_click", {
      ad_id: ad._id,
      url: ad.externalUrl,
    });
  };

  return (
    <a
      href={ad.externalUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="feature-post-item style-small d-flex align-items-center hover-image-rotate"
      onClick={handleClick}
      aria-label={`${ad.metaPrimary}: ${ad.title}`}
    >
      <span className="img-style">
        {ad.thumbnailUrl ? (
          <Image
            decoding="async"
            loading="lazy"
            width={123}
            height={92}
            alt={ad.title}
            src={ad.thumbnailUrl}
          />
        ) : null}
      </span>
      <span className="content">
        <ul className="meta-feature text-caption-2 fw-7 text_secodary-color d-flex align-items-center mb_8 text-uppercase">
          <li>{ad.metaPrimary}</li>
          {ad.metaSecondary ? (
            <li>
              <span className="text-uppercase">{ad.metaSecondary}</span>
            </li>
          ) : null}
        </ul>
        <h6 className="title">
          <span className="link line-clamp-2">{ad.title}</span>
        </h6>
      </span>
    </a>
  );
}
