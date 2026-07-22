"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/types/course";
import CourseCard1 from "@/components/courses/CourseCard1";
import CoursesEmptyIcon from "@/components/courses/CoursesEmptyIcon";
import { fetchCourses } from "@/lib/courses";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function CoursesCatalog({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const { isAuthenticated } = useAuthUser();
  const [courses, setCourses] = useState(initialCourses);

  useEffect(() => {
    if (!isAuthenticated) {
      setCourses(initialCourses);
      return;
    }

    let cancelled = false;
    fetchCourses(undefined, { withAuth: true }).then((personalized) => {
      if (!cancelled && personalized.length > 0) {
        setCourses(personalized);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, initialCourses]);

  const isCatalogEmpty = courses.length === 0;

  return (
    <section className="courses-catalog tf-container tf-spacing-1">
      <header className="courses-catalog__header">
        <div className="courses-catalog__intro">
          <h1 className="courses-catalog__title">Courses</h1>
          <p className="courses-catalog__subtitle text-body-1">
            Learn architecture software and design skills with video courses on
            D5 Render, Rhino, Grasshopper, and more.
          </p>
        </div>
      </header>

      {isCatalogEmpty ? (
        <div className="courses-catalog__empty">
          <div className="courses-catalog__empty-icon" aria-hidden="true">
            <CoursesEmptyIcon />
          </div>
          <h2 className="courses-catalog__empty-title">Courses coming soon</h2>
          <p className="courses-catalog__empty-text text-body-1">
            We are preparing new video courses on architecture software and
            design workflows. Check back soon for hands-on lessons you can start
            right away.
          </p>
        </div>
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
