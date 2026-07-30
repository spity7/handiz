"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/types/course";
import CourseCard1 from "@/components/courses/CourseCard1";
import CoursesCatalogEmpty from "@/components/courses/CoursesCatalogEmpty";
import { prefetchAuthCourses } from "@/lib/courses";

if (typeof window !== "undefined") {
  prefetchAuthCourses();
}

export default function CoursesCatalog({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [courses, setCourses] = useState(initialCourses);

  useEffect(() => {
    let cancelled = false;

    prefetchAuthCourses().then((personalized) => {
      if (!cancelled && personalized.length > 0) {
        setCourses(personalized);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const isCatalogEmpty = courses.length === 0;

  return (
    <section className="courses-catalog tf-container tf-spacing-1">
      <header className="courses-catalog__header">
        <div className="courses-catalog__intro">
          <h1 className="courses-catalog__title">Courses</h1>
        </div>
      </header>

      {isCatalogEmpty ? (
        <CoursesCatalogEmpty />
      ) : (
        <div className="tf-grid-layout xxl-col-4 sm-col-2 courses-catalog__grid">
          {courses.map((course) => (
            <CourseCard1 key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
