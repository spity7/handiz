"use client";

import AdStripCard from "@/components/ads/AdStripCard";
import { fetchHomepageAds, type HomepageAd } from "@/lib/homepageAds";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function HomepageAdsBar() {
  const [ads, setAds] = useState<HomepageAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = await fetchHomepageAds();
      if (!cancelled) {
        setAds(list);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div
        className="page-title homepage-2 sw-layout homepage-ads-bar"
        aria-hidden="true"
      >
        <div className="tf-container w-xxl">
          <div className="homepage-ads-bar__skeleton skeleton-block" />
        </div>
      </div>
    );
  }

  if (!ads.length) {
    return null;
  }

  return (
    <div className="page-title homepage-2 sw-layout homepage-ads-bar">
      <div className="tf-container w-xxl">
        <Swiper
          className="swiper wrap-feature"
          spaceBetween={8}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 12 },
            992: { slidesPerView: 3, spaceBetween: 12 },
            1200: { slidesPerView: 4, spaceBetween: 16 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd-home-ads",
          }}
        >
          {ads.map((ad) => (
            <SwiperSlide className="swiper-slide" key={ad._id}>
              <AdStripCard ad={ad} />
            </SwiperSlide>
          ))}
          <div className="sw-dots sw-pagination-layout justify-content-center d-flex d-md-none spd-home-ads" />
        </Swiper>
      </div>
    </div>
  );
}
