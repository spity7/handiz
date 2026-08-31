"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  buildChromelessEmbedUrl,
  getEmbedProvider,
  parseEmbedPlayerState,
  postEmbedPlaybackCommand,
  startEmbedStateListening,
} from "@/lib/courseMarketingVideos";

type CourseDetailIntroButtonProps = {
  introVideoUrl: string;
  introVideoEmbedUrl?: string;
};

function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 2.2v9.6c0 .7.8 1.1 1.4.7l7.4-4.8c.5-.3.5-1.1 0-1.4L4.4 1.5C3.8 1.1 3 1.5 3 2.2z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="2.5" y="2" width="3.2" height="10" rx="0.8" />
      <rect x="8.3" y="2" width="3.2" height="10" rx="0.8" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 2.5H2.5V6.5M11.5 2.5H15.5V6.5M11.5 15.5H15.5V11.5M6.5 15.5H2.5V11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 6.5H2.5V2.5M11.5 6.5H15.5V2.5M11.5 11.5H15.5V15.5M6.5 11.5H2.5V15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroPlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 2.2v9.6c0 .7.8 1.1 1.4.7l7.4-4.8c.5-.3.5-1.1 0-1.4L4.4 1.5C3.8 1.1 3 1.5 3 2.2z" />
    </svg>
  );
}

type IntroVideoModalProps = {
  embedUrl: string;
  onClose: () => void;
};

function IntroVideoModal({ embedUrl, onClose }: IntroVideoModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const provider = useMemo(() => getEmbedProvider(embedUrl), [embedUrl]);
  const chromelessEmbedUrl = useMemo(
    () =>
      buildChromelessEmbedUrl(
        embedUrl,
        typeof window !== "undefined" ? window.location.origin : undefined,
      ),
    [embedUrl],
  );

  const closeModal = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    document.body.classList.add("course-detail-preview-modal-open");
    return () => {
      document.body.classList.remove("course-detail-preview-modal-open");
    };
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIframeReady(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === panelRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const nextState = parseEmbedPlayerState(event, provider);
      if (nextState === "playing") setIsPlaying(true);
      if (nextState === "paused") setIsPlaying(false);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [provider]);

  const onIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (provider === "youtube") {
      startEmbedStateListening(iframe);
    }

    setIsPlaying(true);
  };

  const togglePlayback = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const nextPlaying = !isPlaying;
    postEmbedPlaybackCommand(iframe, provider, nextPlaying ? "play" : "pause");
    setIsPlaying(nextPlaying);
  };

  const toggleFullscreen = async () => {
    const panel = panelRef.current;
    if (!panel) return;

    try {
      if (document.fullscreenElement === panel) {
        await document.exitFullscreen();
        return;
      }

      await panel.requestFullscreen();
    } catch {
      // Ignore browsers that block fullscreen without a direct user gesture chain.
    }
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className="course-detail-preview-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Course intro video"
    >
      <button
        type="button"
        className="course-detail-preview-modal__backdrop"
        aria-label="Close intro video"
        onClick={closeModal}
      />

      <div
        ref={panelRef}
        className={`course-detail-preview-modal__panel${isFullscreen ? " course-detail-preview-modal__panel--fullscreen" : ""}`}
      >
        <div className="course-detail-preview-modal__embed">
          {iframeReady ? (
            <iframe
              ref={iframeRef}
              src={chromelessEmbedUrl}
              title="Course intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={onIframeLoad}
            />
          ) : (
            <div
              className="course-detail-preview-modal__loading"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="course-detail-preview-modal__controls">
          <button
            type="button"
            className="course-detail-preview-modal__control course-detail-preview-modal__control--close"
            aria-label="Close intro video"
            onClick={closeModal}
          >
            <span
              className="course-detail-preview-modal__close-icon"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="course-detail-preview-modal__control course-detail-preview-modal__control--center"
            aria-label={isPlaying ? "Pause intro video" : "Play intro video"}
            onClick={togglePlayback}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            type="button"
            className="course-detail-preview-modal__control course-detail-preview-modal__control--expand"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function CourseDetailIntroButton({
  introVideoUrl,
  introVideoEmbedUrl,
}: CourseDetailIntroButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const embedUrl = introVideoEmbedUrl?.trim() || "";
  const embeddable = Boolean(embedUrl);

  const openVideo = () => {
    if (embeddable) {
      setIsOpen(true);
      return;
    }

    window.open(introVideoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        type="button"
        className="course-detail-hero__btn course-detail-hero__btn--secondary"
        onClick={openVideo}
      >
        <HeroPlayIcon />
        Watch the Intro
      </button>

      {isOpen && embeddable ? (
        <IntroVideoModal embedUrl={embedUrl} onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
}
