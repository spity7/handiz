"use client";

import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/types/course";
import CourseCard1 from "@/components/courses/CourseCard1";
import CoursesEmptyIcon from "@/components/courses/CoursesEmptyIcon";
import { fetchCourses } from "@/lib/courses";
import { getPublicPriceDisplay } from "@/lib/coursePricing";
import { useAuthUser } from "@/hooks/useAuthUser";

type Filter = "all" | "free" | "paid";

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "All courses" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

export default function CoursesCatalog({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const { isAuthenticated } = useAuthUser();
  const [courses, setCourses] = useState(initialCourses);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

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
      if (search) {
        const q = search.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          course.excerpt?.toLowerCase().includes(q) ||
          course.tags?.some((tag) => tag.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [courses, filter, search]);

  const hasActiveFilters = filter !== "all" || search.trim().length > 0;
  const isCatalogEmpty = courses.length === 0;
  const isFilteredEmpty = !isCatalogEmpty && filtered.length === 0;

  const clearFilters = () => {
    setFilter("all");
    setSearch("");
  };

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

        {!isCatalogEmpty && (
          <div className="courses-catalog__toolbar" aria-label="Course filters">
            <form
              action="#"
              className="form-search courses-catalog__search"
              onSubmit={(event) => event.preventDefault()}
            >
              <fieldset className="input-search">
                <label htmlFor="courses-search" className="visually-hidden">
                  Search courses
                </label>
                <input
                  id="courses-search"
                  type="search"
                  name="courses-search"
                  placeholder="Search by title, topic, or tag..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  autoComplete="off"
                />
              </fieldset>
              <div className="btn-submit">
                <button
                  type="submit"
                  className="btn-icon black-on-dark animate-hover-btn"
                  aria-label="Search courses"
                >
                  <i className="icon-search" />
                </button>
              </div>
            </form>

            <div className="courses-catalog__controls">
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

              {hasActiveFilters && (
                <button
                  type="button"
                  className="courses-catalog__clear-btn"
                  onClick={clearFilters}
                >
                  <i className="icon-XCircle" aria-hidden="true" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {!isCatalogEmpty && (
        <p
          className="courses-catalog__results text-caption-2"
          aria-live="polite"
        >
          Showing{" "}
          <strong>
            {filtered.length} of {courses.length}
          </strong>{" "}
          {courses.length === 1 ? "course" : "courses"}
          {hasActiveFilters ? " matching your filters" : ""}
        </p>
      )}

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
      ) : isFilteredEmpty ? (
        <div className="courses-catalog__empty courses-catalog__empty--filtered">
          <div className="courses-catalog__empty-icon" aria-hidden="true">
            <i className="icon-search" />
          </div>
          <h2 className="courses-catalog__empty-title">
            No courses match your search
          </h2>
          <p className="courses-catalog__empty-text text-body-1">
            Try a different keyword or switch to another price filter to see
            more courses.
          </p>
          <button
            type="button"
            className="tf-btn animate-hover-btn btn-switch-text courses-catalog__empty-action"
            onClick={clearFilters}
          >
            <span>
              <span className="btn-double-text" data-text="Clear all filters">
                Clear all filters
              </span>
            </span>
          </button>
        </div>
      ) : (
        <div className="tf-grid-layout xxl-col-4 sm-col-2 courses-catalog__grid">
          {filtered.map((course) => (
            <CourseCard1 key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
