"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CourseCard1 from "@/components/courses/CourseCard1";
import CoursesEmptyIcon from "@/components/courses/CoursesEmptyIcon";
import StudentProjectCardSkeleton from "@/components/skeletons/StudentProjectCardSkeleton";
import { fetchCourses } from "@/lib/courses";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { Course } from "@/types/course";

const FEATURED_LIMIT = 3;

export default function LatestPostsCourses() {
  const { isAuthenticated } = useAuthUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetchCourses(undefined, { withAuth: isAuthenticated })
      .then((data) => {
        if (!cancelled) {
          setCourses(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const featured = courses.slice(0, FEATURED_LIMIT);
  const isCatalogEmpty = !loading && courses.length === 0;

  return (
    <section className="courses-home tf-container tf-spacing-1">
      <header className="courses-home__header">
        <div className="courses-home__intro">
          <h3 className="courses-home__title title mb-0">Courses</h3>
          <p className="courses-home__subtitle text-body-1">
            Start learning architecture software and design workflows with
            hands-on video lessons.
          </p>
        </div>

        {!loading && courses.length > 0 && (
          <Link
            href="/courses"
            className="courses-home__view-all tf-btn animate-hover-btn btn-switch-text"
          >
            <span>
              <span className="btn-double-text" data-text="View all courses">
                View all courses
              </span>
            </span>
          </Link>
        )}
      </header>

      {loading ? (
        <div
          className="tf-grid-layout xxl-col-3 sm-col-2 courses-home__grid"
          aria-busy="true"
          aria-label="Loading courses"
        >
          {Array.from({ length: FEATURED_LIMIT }, (_, index) => (
            <StudentProjectCardSkeleton key={index} />
          ))}
        </div>
      ) : isCatalogEmpty ? (
        <div className="courses-catalog__empty courses-home__empty">
          <div className="courses-catalog__empty-icon" aria-hidden="true">
            <CoursesEmptyIcon />
          </div>
          <h4 className="courses-catalog__empty-title">Courses coming soon</h4>
          <p className="courses-catalog__empty-text text-body-1">
            We are preparing new video courses on architecture software and
            design workflows. Check back soon for hands-on lessons you can start
            right away.
          </p>
        </div>
      ) : (
        <>
          {courses.length > FEATURED_LIMIT && (
            <p className="courses-home__meta text-caption-2">
              Showing <strong>{featured.length}</strong> featured{" "}
              {featured.length === 1 ? "course" : "courses"}
              {" · "}
              <Link href="/courses" className="courses-home__meta-link">
                Browse all {courses.length}
              </Link>
            </p>
          )}

          <div className="tf-grid-layout xxl-col-3 sm-col-2 courses-home__grid">
            {featured.map((course) => (
              <CourseCard1 key={course._id} course={course} />
            ))}
          </div>

          {courses.length > FEATURED_LIMIT && (
            <div className="courses-home__footer">
              <Link
                href="/courses"
                className="courses-home__browse-link text-body-1"
              >
                Browse all {courses.length} courses →
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
