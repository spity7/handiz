"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Course } from "@/types/course";
import CourseDetailMarketingVideoCard from "@/components/course-detail/CourseDetailMarketingVideoCard";
import {
  getCourseMarketingVideos,
  MAX_COURSE_MARKETING_VIDEOS,
} from "@/lib/courseMarketingVideos";

type CourseDetailPreviewSectionProps = {
  course: Course;
};

type ScrollMetrics = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  thumbWidth: number;
  thumbOffset: number;
};

const INITIAL_SCROLL_METRICS: ScrollMetrics = {
  canScrollPrev: false,
  canScrollNext: false,
  thumbWidth: 100,
  thumbOffset: 0,
};

export default function CourseDetailPreviewSection({
  course,
}: CourseDetailPreviewSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<ScrollMetrics>(INITIAL_SCROLL_METRICS);
  const marketingVideos = getCourseMarketingVideos(
    course.marketingVideos,
    MAX_COURSE_MARKETING_VIDEOS,
  );
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);

  const updateMetrics = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const thumbWidth =
      scroller.scrollWidth > 0
        ? Math.min(
            100,
            Math.max(12, (scroller.clientWidth / scroller.scrollWidth) * 100),
          )
        : 100;
    const thumbOffset =
      maxScroll > 0
        ? (scroller.scrollLeft / maxScroll) * (100 - thumbWidth)
        : 0;

    setMetrics({
      canScrollPrev: scroller.scrollLeft > 1,
      canScrollNext: scroller.scrollLeft < maxScroll - 1,
      thumbWidth,
      thumbOffset,
    });
  }, []);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(scroller);
    Array.from(scroller.children).forEach((child) => observer.observe(child));
    window.addEventListener("resize", updateMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, [marketingVideos.length, updateMetrics]);

  if (marketingVideos.length === 0) {
    return null;
  }

  const gridStyle = {
    "--course-preview-columns": marketingVideos.length,
  } as CSSProperties;
  const canScroll = metrics.canScrollPrev || metrics.canScrollNext;

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const card = scroller.querySelector<HTMLElement>(
      ".course-detail-preview__grid-cell",
    );
    const gap =
      Number.parseFloat(getComputedStyle(scroller).columnGap) ||
      Number.parseFloat(getComputedStyle(scroller).gap) ||
      12;
    const amount = (card?.offsetWidth ?? scroller.clientWidth * 0.7) + gap;
    scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const scrollToPointer = (clientX: number) => {
    const scroller = scrollerRef.current;
    const track = scrollbarRef.current;
    if (!scroller || !track) {
      return;
    }

    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) {
      return;
    }

    const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const thumbWidthPx = (metrics.thumbWidth / 100) * rect.width;
    const pointer = clientX - rect.left - thumbWidthPx / 2;
    const ratio = Math.min(
      1,
      Math.max(0, pointer / Math.max(1, rect.width - thumbWidthPx)),
    );
    scroller.scrollLeft = ratio * maxScroll;
  };

  const onScrollbarPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canScroll) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    scrollToPointer(event.clientX);
  };

  const onScrollbarPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    scrollToPointer(event.clientX);
  };

  return (
    <section
      className="course-detail-preview tf-container tf-spacing-1"
      aria-labelledby="course-preview-heading"
    >
      <header className="heading-section course-detail-preview__header mb_28">
        <h3 id="course-preview-heading" className="title">
          Inside the Course
        </h3>
        <div className="course-detail-preview__nav">
          <button
            type="button"
            className="course-detail-preview__nav-btn"
            aria-label="Show previous videos"
            disabled={!metrics.canScrollPrev}
            onClick={() => scrollByCard(-1)}
          >
            <i className="icon-CaretLeft" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="course-detail-preview__nav-btn"
            aria-label="Show next videos"
            disabled={!metrics.canScrollNext}
            onClick={() => scrollByCard(1)}
          >
            <i className="icon-CaretRight" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        ref={scrollerRef}
        id="course-preview-scroller"
        className="course-detail-preview__grid"
        style={gridStyle}
        onScroll={updateMetrics}
      >
        {marketingVideos.map((video, index) => {
          const videoKey = `${video.order}-${video.url}`;

          return (
            <CourseDetailMarketingVideoCard
              key={videoKey}
              video={video}
              videoIndex={index}
              fallbackThumbnail={course.thumbnailUrl}
              isPlaying={activeVideoKey === videoKey}
              onTogglePlay={() =>
                setActiveVideoKey((current) =>
                  current === videoKey ? null : videoKey,
                )
              }
            />
          );
        })}
      </div>

      <div
        ref={scrollbarRef}
        className={`course-detail-preview__scrollbar${canScroll ? "" : " course-detail-preview__scrollbar--idle"}`}
        role="scrollbar"
        aria-controls="course-preview-scroller"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(metrics.thumbOffset)}
        aria-label="Course preview videos"
        tabIndex={canScroll ? 0 : -1}
        onPointerDown={onScrollbarPointerDown}
        onPointerMove={onScrollbarPointerMove}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollByCard(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollByCard(-1);
          }
        }}
      >
        <span
          className="course-detail-preview__scrollbar-thumb"
          style={{
            width: `${metrics.thumbWidth}%`,
            left: `${metrics.thumbOffset}%`,
          }}
        />
      </div>
    </section>
  );
}
