import Link from "next/link";

const VOLUNTEER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScI0HN9XiNjEmMJVr_Pd0wMiXrixp8OMQ8zL5x1_bGFvQk7qQ/viewform?pli=1";

type ArchOfficesEmptyStateProps = {
  variant: "empty" | "error";
  onRetry?: () => void;
};

export default function ArchOfficesEmptyState({
  variant,
  onRetry,
}: ArchOfficesEmptyStateProps) {
  const isError = variant === "error";

  return (
    <div
      className={`courses-catalog__empty arch-offices-page__empty${
        isError ? " arch-offices-page__empty--error" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="courses-catalog__empty-eyebrow">
        {isError ? "Connection issue" : "Hiring paused"}
      </span>
      <div className="courses-catalog__empty-icon" aria-hidden="true">
        <i className={isError ? "icon-ChatsCircle" : "icon-MapPin"} />
      </div>
      <h2 className="courses-catalog__empty-title">
        {isError
          ? "We couldn’t load offices"
          : "No studios are hiring right now"}
      </h2>
      <p className="courses-catalog__empty-text text-body-1">
        {isError
          ? "Please check your connection and try again."
          : "New listings appear here when studios mark themselves as hiring."}
      </p>
      <div className="courses-catalog__empty-action arch-offices-page__empty-actions">
        {isError ? (
          <button
            type="button"
            className="tf-btn btn-fill animate-hover-btn btn-switch-text courses-catalog__empty-btn"
            onClick={() => onRetry?.()}
          >
            <span>
              <span className="btn-double-text" data-text="Try again">
                Try again
              </span>
            </span>
          </button>
        ) : (
          <>
            <Link
              href="/courses"
              className="tf-btn btn-fill animate-hover-btn btn-switch-text courses-catalog__empty-btn"
            >
              <span>
                <span className="btn-double-text" data-text="Explore courses">
                  Explore courses
                </span>
              </span>
            </Link>
            <a
              href={VOLUNTEER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="arch-offices-page__empty-link text-body-1"
            >
              Volunteer with Handiz
            </a>
          </>
        )}
      </div>
    </div>
  );
}
