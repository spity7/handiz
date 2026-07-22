import type { Course, CourseModule, Enrollment } from "@/types/course";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

export async function fetchCourses(
  params?: {
    tag?: string;
    level?: string;
    free?: string;
    search?: string;
  },
  options?: { withAuth?: boolean },
): Promise<Course[]> {
  const searchParams = new URLSearchParams();
  if (params?.tag) searchParams.set("tag", params.tag);
  if (params?.level) searchParams.set("level", params.level);
  if (params?.free) searchParams.set("free", params.free);
  if (params?.search) searchParams.set("search", params.search);

  const qs = searchParams.toString();
  const res = await fetch(`${API_BASE_URL}courses${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
    ...(options?.withAuth
      ? { credentials: "include" as RequestCredentials }
      : {}),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.courses || [];
}

export function formatDuration(minutes?: number) {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export async function fetchCourseBySlug(
  slug: string,
  options?: { withAuth?: boolean },
) {
  const res = await fetch(`${API_BASE_URL}courses/slug/${slug}`, {
    cache: "no-store",
    ...(options?.withAuth
      ? { credentials: "include" as RequestCredentials }
      : {}),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{
    course: Course;
    curriculum: CourseModule[];
    enrollment: Enrollment | null;
    isEnrolled: boolean;
  }>;
}

export function formatDurationHours(minutes?: number) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  if (hours < 1) return "Under 1 hour of premium content";
  return `${hours}+ hour${hours === 1 ? "" : "s"} of premium content`;
}

function formatLessonCountHighlight(count: number) {
  return `${count} step-by-step video ${count === 1 ? "lesson" : "lessons"}`;
}

export function getCourseHeroHighlights(course: Course) {
  const custom = (course.heroHighlights || [])
    .map((item) => item.trim())
    .filter(Boolean);

  if (custom.length > 0) return custom;

  const highlights: string[] = [];

  const durationLabel = formatDurationHours(course.totalDurationMinutes);
  if (durationLabel) highlights.push(durationLabel);

  if (course.lessonCount) {
    highlights.push(formatLessonCountHighlight(course.lessonCount));
  }

  highlights.push("Lifetime access", "Future updates included");

  return highlights;
}

export function getPreviewLesson(curriculum: CourseModule[] = []) {
  for (const module of curriculum) {
    const preview = module.lessons.find((lesson) => lesson.isPreview);
    if (preview) return preview;
  }
  return null;
}

export function getCourseHeroImages(course: Course) {
  const fallback = course.thumbnailUrl || "";
  const desktop = course.heroImageDesktopUrl || fallback;
  const mobile =
    course.heroImageMobileUrl || course.heroImageDesktopUrl || fallback;

  return {
    desktop,
    mobile,
    hasDedicatedHero: Boolean(
      course.heroImageDesktopUrl && course.heroImageMobileUrl,
    ),
  };
}
