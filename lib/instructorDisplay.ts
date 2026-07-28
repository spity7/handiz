import type { CourseInstructor } from "@/types/course";

export function getInstructorDisplayName(instructor?: CourseInstructor | null) {
  if (!instructor) return "";
  const name = [instructor.firstname, instructor.lastname]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");
  return name || instructor.username?.trim() || "";
}

export function getInstructorInitials(instructor?: CourseInstructor | null) {
  const name = getInstructorDisplayName(instructor);
  if (!name) return "?";
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

export function hasInstructorPublicProfile(
  instructor?: CourseInstructor | null,
) {
  if (!instructor) return false;
  return Boolean(
    getInstructorDisplayName(instructor) ||
    instructor.avatarUrl?.trim() ||
    instructor.bio?.trim() ||
    instructor.location?.trim() ||
    instructor.instagramUrl?.trim() ||
    instructor.facebookUrl?.trim() ||
    instructor.xUrl?.trim(),
  );
}
