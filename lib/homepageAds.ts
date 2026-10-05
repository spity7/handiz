const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

import type { HomepageAdStatus } from "./homepageAdStatus";

export type HomepageAd = {
  _id: string;
  title: string;
  status: HomepageAdStatus;
  metaSecondary?: string;
  externalUrl: string;
  thumbnailUrl: string;
  order: number;
  isPublished?: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
};

export async function fetchHomepageAds(): Promise<HomepageAd[]> {
  try {
    const res = await fetch(`${API_BASE}homepage-ads`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.homepageAds) ? data.homepageAds : [];
  } catch {
    return [];
  }
}
