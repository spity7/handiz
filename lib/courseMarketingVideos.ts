import type { CourseMarketingVideo } from "@/types/course";

export function getCourseMarketingVideos(
  videos: CourseMarketingVideo[] | undefined,

  limit = 3,
): CourseMarketingVideo[] {
  if (!videos?.length) return [];

  return [...videos]

    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

    .slice(0, limit);
}

export function canEmbedMarketingVideo(video: CourseMarketingVideo) {
  return Boolean(video.embedUrl?.trim());
}

/** YouTube Shorts and similar vertical clips use a tall frame. */

export function isPortraitMarketingVideo(video: CourseMarketingVideo) {
  const url = video.url?.trim();

  if (!url) return false;

  try {
    const parsed = new URL(url);

    return parsed.pathname.includes("/shorts/");
  } catch {
    return false;
  }
}

export function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();

  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];

      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] || null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] || null;
      }

      const v = parsed.searchParams.get("v");

      if (v) return v;
    }
  } catch {
    return null;
  }

  return null;
}

/** Tall crop for Shorts; avoids 16:9 maxresdefault letterboxing. */

export function getYouTubeShortThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/oar2.jpg`;
}

export function getYouTubeWatchThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

const DEFAULT_MARKETING_THUMB = "/images/sections/latest-post-1.webp";

export function getMarketingVideoThumbnailUrl(
  video: CourseMarketingVideo,

  fallbackThumbnail?: string,
): string {
  const youtubeId = extractYouTubeVideoId(video.url || "");

  if (youtubeId) {
    if (isPortraitMarketingVideo(video)) {
      return getYouTubeShortThumbnailUrl(youtubeId);
    }

    return getYouTubeWatchThumbnailUrl(youtubeId);
  }

  const stored = video.thumbnailUrl?.trim();

  if (stored) return stored;

  const fallback = fallbackThumbnail?.trim();

  if (fallback) return fallback;

  return DEFAULT_MARKETING_THUMB;
}

export function getMarketingVideoThumbnailFallbacks(
  video: CourseMarketingVideo,

  fallbackThumbnail?: string,
): string[] {
  const youtubeId = extractYouTubeVideoId(video.url || "");

  const urls: string[] = [];

  if (youtubeId) {
    if (isPortraitMarketingVideo(video)) {
      urls.push(
        getYouTubeShortThumbnailUrl(youtubeId),

        `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,

        getYouTubeWatchThumbnailUrl(youtubeId),
      );
    } else {
      urls.push(
        getYouTubeWatchThumbnailUrl(youtubeId),

        `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
      );
    }
  }

  const stored = video.thumbnailUrl?.trim();

  if (stored) urls.push(stored);

  const fallback = fallbackThumbnail?.trim();

  if (fallback) urls.push(fallback);

  urls.push(DEFAULT_MARKETING_THUMB);

  return [...new Set(urls)];
}
