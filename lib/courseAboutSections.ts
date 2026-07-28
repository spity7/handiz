import type { CourseAboutSection } from "@/types/course";

export function getCourseAboutSections(
  sections: CourseAboutSection[] | undefined,
): CourseAboutSection[] {
  if (!sections?.length) return [];

  return [...sections]
    .map((section, index) => ({
      title: section.title?.trim() || "",
      items: (section.items || []).map((item) => item?.trim()).filter(Boolean),
      order: Number.isFinite(section.order) ? section.order : index,
    }))
    .filter((section) => section.title && section.items.length > 0)
    .sort((a, b) => a.order - b.order);
}
