const LMS_URL = process.env.NEXT_PUBLIC_LMS_URL || "https://learn.handiz.org";

export function getLmsUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${LMS_URL.replace(/\/$/, "")}${normalized}`;
}
