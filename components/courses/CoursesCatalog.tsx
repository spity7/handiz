"use client";

import { useEffect, useMemo, useState } from "react";
import type { Course } from "@/types/course";
import CourseCard1 from "@/components/courses/CourseCard1";
import { fetchCourses } from "@/lib/courses";
import { getPublicPriceDisplay } from "@/lib/coursePricing";
import { useAuthUser } from "@/hooks/useAuthUser";

type Filter = "all" | "free" | "paid";

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

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const isFree = getPublicPriceDisplay(c.pricing).isFree;
      if (filter === "free" && !isFree) return false;
      if (filter === "paid" && isFree) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.excerpt?.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [courses, filter, search]);

  return (
    <div className="tf-container tf-spacing-1">
      <div className="heading-section mb_28 d-flex flex-wrap justify-content-between align-items-end gap-3">
        <h3 className="title mb-0">Courses</h3>
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <input
            type="search"
            className="form-control"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ minWidth: 200 }}
          />
          {(["all", "free", "paid"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "free" ? "Free" : "Paid"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center py-5 text-muted">
          No courses available yet. Check back soon.
        </p>
      ) : (
        <div className="tf-grid-layout xxl-col-4 sm-col-2">
          {filtered.map((course) => (
            <CourseCard1 key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
