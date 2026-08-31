import type { CourseMarketingVideo } from "@/types/course";

export const MIN_COURSE_MARKETING_VIDEOS = 4;
export const MAX_COURSE_MARKETING_VIDEOS = 7;

export function getCourseMarketingVideos(
  videos: CourseMarketingVideo[] | undefined,

  limit = MAX_COURSE_MARKETING_VIDEOS,
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

export type EmbedProvider = "youtube" | "vimeo" | "unknown";

export function getEmbedProvider(embedUrl: string): EmbedProvider {
  try {
    const host = new URL(embedUrl).hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      return "youtube";
    }
    if (host === "player.vimeo.com") {
      return "vimeo";
    }
  } catch {
    return "unknown";
  }

  return "unknown";
}

export function buildChromelessEmbedUrl(
  embedUrl: string,
  origin?: string,
): string {
  const url = new URL(embedUrl);
  const provider = getEmbedProvider(embedUrl);

  if (provider === "youtube") {
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("controls", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("rel", "0");
    url.searchParams.set("iv_load_policy", "3");
    url.searchParams.set("playsinline", "1");
    url.searchParams.set("enablejsapi", "1");
    url.searchParams.set("fs", "0");
    url.searchParams.set("disablekb", "1");
    url.searchParams.set("cc_load_policy", "0");
    if (origin) {
      url.searchParams.set("origin", origin);
    }
    return url.toString();
  }

  if (provider === "vimeo") {
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("controls", "0");
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("dnt", "1");
    return url.toString();
  }

  url.searchParams.set("autoplay", "1");
  return url.toString();
}

export function postEmbedPlaybackCommand(
  iframe: HTMLIFrameElement,
  provider: EmbedProvider,
  command: "play" | "pause",
) {
  const target = iframe.contentWindow;
  if (!target) return;

  if (provider === "youtube") {
    target.postMessage(
      JSON.stringify({
        event: "command",
        func: command === "play" ? "playVideo" : "pauseVideo",
        args: "",
      }),
      "*",
    );
    return;
  }

  if (provider === "vimeo") {
    target.postMessage(
      JSON.stringify({ method: command === "play" ? "play" : "pause" }),
      "*",
    );
  }
}

export function startEmbedStateListening(iframe: HTMLIFrameElement) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
    "*",
  );
}

export function parseEmbedPlayerState(
  event: MessageEvent,
  provider: EmbedProvider,
): "playing" | "paused" | null {
  if (provider === "youtube") {
    if (
      event.origin !== "https://www.youtube.com" &&
      event.origin !== "https://www.youtube-nocookie.com"
    ) {
      return null;
    }

    try {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      const playerState =
        data?.info?.playerState ?? data?.data?.info?.playerState;

      if (playerState === 1) return "playing";
      if (playerState === 2) return "paused";
    } catch {
      return null;
    }

    return null;
  }

  if (provider === "vimeo") {
    if (event.origin !== "https://player.vimeo.com") return null;

    try {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      if (data?.event === "play") return "playing";
      if (data?.event === "pause") return "paused";
    } catch {
      return null;
    }
  }

  return null;
}
