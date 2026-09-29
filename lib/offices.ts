import type { Office } from "@/types/office";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

/** Set `NEXT_PUBLIC_ENABLE_ARCH_OFFICES=false` to hide nav links without removing the page. */
export function isArchOfficesEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ARCH_OFFICES !== "false";
}

export function formatOfficeExternalLink(link?: string | null): string | null {
  const trimmed = link?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getOfficeLinkLabel(link?: string | null): string {
  const href = formatOfficeExternalLink(link);
  if (!href) return "Visit website";
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "Visit website";
  }
}

export function formatOfficeLocation(
  location: Office["location"] | undefined,
): string {
  if (!location) return "";
  return Array.isArray(location) ? location.join(", ") : location;
}

export function isOfficeHiring(office: Office): boolean {
  return office.status?.includes("Hiring") ?? false;
}

export function sortOffices(offices: Office[]): Office[] {
  return [...offices].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/** Public site lists offices that are actively hiring. */
export function filterPublicOffices(offices: Office[]): Office[] {
  return sortOffices(offices.filter(isOfficeHiring));
}

export async function fetchOffices(): Promise<{
  offices: Office[];
  ok: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}offices`, {
      cache: "no-store",
    });
    if (!res.ok) return { offices: [], ok: false };
    const data = await res.json();
    const offices: Office[] = data.offices ?? [];
    return { offices, ok: true };
  } catch {
    return { offices: [], ok: false };
  }
}
