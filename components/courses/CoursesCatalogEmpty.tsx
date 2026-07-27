import Link from "next/link";
import CoursesEmptyIcon from "@/components/courses/CoursesEmptyIcon";

export default function CoursesCatalogEmpty() {
  return (
    <div className="courses-catalog__empty">
      <span className="courses-catalog__empty-eyebrow">Coming soon</span>
      <div className="courses-catalog__empty-icon" aria-hidden="true">
        <CoursesEmptyIcon />
      </div>
      <h2 className="courses-catalog__empty-title">
        New courses are on the way
      </h2>
      <p className="courses-catalog__empty-text text-body-1">
        We&apos;re building hands-on video lessons on architecture software and
        design workflows. Check back soon—or explore what&apos;s already on
        Handiz while you wait.
      </p>
      <div className="courses-catalog__empty-action">
        <Link
          href="/"
          className="tf-btn btn-fill animate-hover-btn btn-switch-text courses-catalog__empty-btn"
        >
          <span>
            <span className="btn-double-text" data-text="Back to home">
              Back to home
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
