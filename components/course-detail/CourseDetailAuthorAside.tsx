import Image from "next/image";
import type { CourseInstructor } from "@/types/course";
import {
  getInstructorDisplayName,
  getInstructorInitials,
} from "@/lib/instructorDisplay";

type CourseDetailAuthorAsideProps = {
  instructor: CourseInstructor;
};

export default function CourseDetailAuthorAside({
  instructor,
}: CourseDetailAuthorAsideProps) {
  const name = getInstructorDisplayName(instructor);
  const avatarUrl = instructor.avatarUrl?.trim();
  const location = instructor.location?.trim();
  const bio = instructor.bio?.trim();

  const socialLinks = [
    {
      href: instructor.instagramUrl?.trim(),
      icon: "icon-InstagramLogo",
      label: "Instagram",
    },
    {
      href: instructor.facebookUrl?.trim(),
      icon: "icon-FacebookLogo",
      label: "Facebook",
    },
    {
      href: instructor.xUrl?.trim(),
      icon: "icon-XLogo",
      label: "X",
    },
  ].filter((link) => Boolean(link.href));

  return (
    <aside
      className="course-detail-about__sidebar"
      aria-labelledby="course-about-author-heading"
    >
      <header className="heading-section course-detail-about__header">
        <h3 id="course-about-author-heading" className="title">
          About author
        </h3>
      </header>
      <div className="box-author style-1 text-center course-detail-about__author">
        <div className="info">
          <div className="avatar">
            {avatarUrl ? (
              <Image
                alt={name ? `${name} profile photo` : "Instructor"}
                src={avatarUrl}
                width={400}
                height={400}
                unoptimized
              />
            ) : (
              <span
                className="course-detail-about__avatar-fallback"
                aria-hidden="true"
              >
                {getInstructorInitials(instructor)}
              </span>
            )}
          </div>
          {name ? (
            <h4 className="mb_4">
              <span className="link">{name}</span>
            </h4>
          ) : null}
          {location ? <p className="text-body-1">{location}</p> : null}
        </div>
        {bio ? (
          <p className="text-body-1 course-detail-about__bio">{bio}</p>
        ) : null}
        {socialLinks.length > 0 ? (
          <ul className="social">
            {socialLinks.map((link) => (
              <li key={link.label} className="h6 fw-7 text_on-surface-color">
                <a
                  href={link.href}
                  className="d-flex align-items-center gap_12"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <i className={link.icon} aria-hidden="true" />
                  {link.label !== "X" ? link.label : null}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
