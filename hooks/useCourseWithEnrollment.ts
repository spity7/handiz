"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/types/course";
import {
  applyCourseEnrollmentFromDetail,
  prefetchAuthCourseBySlug,
} from "@/lib/courses";
import { useAuthUser } from "@/hooks/useAuthUser";

export function useCourseWithEnrollment(slug: string, initialCourse: Course) {
  const { isAuthenticated, loading: authLoading } = useAuthUser();
  const [course, setCourse] = useState(initialCourse);
  const [enrollmentFetched, setEnrollmentFetched] = useState(false);

  useEffect(() => {
    let cancelled = false;

    prefetchAuthCourseBySlug(slug)
      .then((data) => {
        if (cancelled || !data) return;
        setCourse((current) => applyCourseEnrollmentFromDetail(current, data));
      })
      .finally(() => {
        if (!cancelled) {
          setEnrollmentFetched(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const ctaReady = !authLoading && (!isAuthenticated || enrollmentFetched);

  return {
    course,
    ctaReady,
    authLoading,
    isAuthenticated,
  };
}
