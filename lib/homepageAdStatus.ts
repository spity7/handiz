export type HomepageAdStatus =
  | "available"
  | "coming_soon"
  | "sold_out"
  | "limited";

export const HOMEPAGE_AD_STATUS_LABELS: Record<HomepageAdStatus, string> = {
  available: "Available",
  coming_soon: "Coming Soon",
  sold_out: "Sold Out",
  limited: "Limited",
};

export function normalizeHomepageAdStatus(
  value: string | undefined | null,
): HomepageAdStatus {
  if (
    value === "available" ||
    value === "coming_soon" ||
    value === "sold_out" ||
    value === "limited"
  ) {
    return value;
  }
  return "available";
}

export function getHomepageAdStatusLabel(status: HomepageAdStatus): string {
  return HOMEPAGE_AD_STATUS_LABELS[status];
}

export function getHomepageAdStatusClassName(status: HomepageAdStatus): string {
  return `homepage-ad-status homepage-ad-status--${status}`;
}

const NON_CLICKABLE_STATUSES: HomepageAdStatus[] = ["coming_soon", "sold_out"];

export function isHomepageAdClickable(status: HomepageAdStatus): boolean {
  return !NON_CLICKABLE_STATUSES.includes(status);
}
