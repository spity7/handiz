import type { Competition } from "@/types/competitions";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

export async function fetchCompetitions(): Promise<{
  competitions: Competition[];
  ok: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}competitions`, {
      cache: "no-store",
    });
    if (!res.ok) return { competitions: [], ok: false };
    const data = await res.json();
    const competitions: Competition[] = data.competitions ?? [];
    return {
      competitions: [...competitions].sort((a, b) => a.order - b.order),
      ok: true,
    };
  } catch {
    return { competitions: [], ok: false };
  }
}

export function splitCompetitionsBySide(competitions: Competition[]) {
  return {
    side1: competitions.filter((c) => c.side === "1"),
    side2: competitions.filter((c) => c.side === "2"),
  };
}
