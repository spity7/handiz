type CoursesEmptyIconProps = {
  className?: string;
};

export default function CoursesEmptyIcon({
  className = "",
}: CoursesEmptyIconProps) {
  return (
    <svg
      className={`courses-empty-icon ${className}`.trim()}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="10"
        width="36"
        height="24"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.25"
      />
      <path
        d="M22 18.5V25.5L28.5 22L22 18.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M14 38H34"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M24 34V38"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M10 16H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 16H38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
