import type { Course } from "@/types/course";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

export async function fetchCourses(params?: {
  tag?: string;
  level?: string;
  free?: string;
  search?: string;
}): Promise<Course[]> {
  const searchParams = new URLSearchParams();
  if (params?.tag) searchParams.set("tag", params.tag);
  if (params?.level) searchParams.set("level", params.level);
  if (params?.free) searchParams.set("free", params.free);
  if (params?.search) searchParams.set("search", params.search);

  const qs = searchParams.toString();
  const res = await fetch(`${API_BASE_URL}courses${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
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
