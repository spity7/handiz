"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CourseCard1 from "@/components/courses/CourseCard1";
import CoursesEmptyIcon from "@/components/courses/CoursesEmptyIcon";
import StudentProjectCardSkeleton from "@/components/skeletons/StudentProjectCardSkeleton";
import { fetchCourses } from "@/lib/courses";
import { getPublicPriceDisplay } from "@/lib/coursePricing";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { Course } from "@/types/course";

type Filter = "all" | "free" | "paid";

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const FEATURED_LIMIT = 3;

export default function LatestPostsCourses() {
  const { isAuthenticated } = useAuthUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

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

  const counts = useMemo(() => {
    const free = courses.filter(
      (course) => getPublicPriceDisplay(course.pricing).isFree,
    ).length;

    return {
      all: courses.length,
      free,
      paid: courses.length - free,
    };
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const isFree = getPublicPriceDisplay(course.pricing).isFree;
      if (filter === "free" && !isFree) return false;
      if (filter === "paid" && isFree) return false;
      return true;
    });
  }, [courses, filter]);

  const featured = filtered.slice(0, FEATURED_LIMIT);
  const hasActiveFilter = filter !== "all";
  const isCatalogEmpty = !loading && courses.length === 0;
  const isFilteredEmpty =
    !loading && courses.length > 0 && filtered.length === 0;

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
          <div
            className="courses-home__toolbar"
            aria-label="Featured course filters"
          >
            <div
              className="courses-catalog__filter-group"
              role="group"
              aria-label="Filter by price"
            >
              {FILTER_OPTIONS.map((option) => {
                const count = counts[option.value];
                const isActive = filter === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`courses-catalog__filter-chip${isActive ? " is-active" : ""}`}
                    onClick={() => setFilter(option.value)}
                    aria-pressed={isActive}
                  >
                    <span>{option.label}</span>
                    <span className="courses-catalog__filter-count">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {hasActiveFilter && (
              <button
                type="button"
                className="courses-catalog__clear-btn"
                onClick={() => setFilter("all")}
              >
                <i className="icon-XCircle" aria-hidden="true" />
                Clear filter
              </button>
            )}
          </div>

          {!isFilteredEmpty && (
            <p className="courses-home__meta text-caption-2" aria-live="polite">
              Showing <strong>{featured.length}</strong> featured{" "}
              {featured.length === 1 ? "course" : "courses"}
              {hasActiveFilter ? ` (${filter})` : ""}
              {courses.length > FEATURED_LIMIT ? (
                <>
                  {" "}
                  ·{" "}
                  <Link href="/courses" className="courses-home__meta-link">
                    Browse all {courses.length}
                  </Link>
                </>
              ) : null}
            </p>
          )}

          {isFilteredEmpty ? (
            <div className="courses-catalog__empty courses-catalog__empty--filtered courses-home__empty">
              <div className="courses-catalog__empty-icon" aria-hidden="true">
                <i className="icon-search" />
              </div>
              <h4 className="courses-catalog__empty-title">
                No {filter} courses right now
              </h4>
              <p className="courses-catalog__empty-text text-body-1">
                Try another filter or explore the full catalog for more options.
              </p>
              <div className="courses-home__empty-actions">
                <button
                  type="button"
                  className="tf-btn animate-hover-btn btn-switch-text courses-catalog__empty-action"
                  onClick={() => setFilter("all")}
                >
                  <span>
                    <span
                      className="btn-double-text"
                      data-text="Show all courses"
                    >
                      Show all courses
                    </span>
                  </span>
                </button>
                <Link
                  href="/courses"
                  className="courses-home__secondary-link text-body-1"
                >
                  Go to courses page →
                </Link>
              </div>
            </div>
          ) : (
            <div className="tf-grid-layout xxl-col-3 sm-col-2 courses-home__grid">
              {featured.map((course) => (
                <CourseCard1 key={course._id} course={course} />
              ))}
            </div>
          )}

          {!isFilteredEmpty && courses.length > FEATURED_LIMIT && (
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
