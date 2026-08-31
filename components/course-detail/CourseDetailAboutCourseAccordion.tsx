"use client";

import { useId } from "react";
import type { CourseAboutSection } from "@/types/course";

type CourseDetailAboutCourseAccordionProps = {
  sections: CourseAboutSection[];
  slug: string;
};

export default function CourseDetailAboutCourseAccordion({
  sections,
  slug,
}: CourseDetailAboutCourseAccordionProps) {
  const baseId = useId().replace(/:/g, "");

  if (sections.length === 0) return null;

  return (
    <div className="course-detail-about__accordion" role="list">
      {sections.map((section, index) => {
        const collapseId = `course-about-${slug}-${baseId}-${index}`;
        const isFirst = index === 0;

        return (
          <div
            key={`${section.order}-${section.title}`}
            className="course-detail-about__panel"
            role="listitem"
          >
            <button
              type="button"
              className={`course-detail-about__trigger${isFirst ? "" : " collapsed"}`}
              data-bs-toggle="collapse"
              data-bs-target={`#${collapseId}`}
              aria-expanded={isFirst}
              aria-controls={collapseId}
            >
              <span className="course-detail-about__trigger-leading">
                <span
                  className="course-detail-about__chevron"
                  aria-hidden="true"
                />
                <span className="course-detail-about__trigger-title">
                  {section.title}
                </span>
              </span>
            </button>
            <div
              id={collapseId}
              className={`collapse${isFirst ? " show" : ""} course-detail-about__collapse`}
            >
              <div className="course-detail-about__collapse-inner">
                <ul className="course-detail-about__items">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
