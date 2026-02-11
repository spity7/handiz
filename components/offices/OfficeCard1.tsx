import { Office } from "@/types/office";
import Image from "next/image";
import Link from "next/link";

export default function OfficeCard1({ office }: { office: Office }) {
  return (
    <div className="feature-post-item style-default hover-image-translate">
      {office.status[0] === "Hiring" && (
        <>
          {office.thumbnailUrl ? (
            <div className="img-style mb_24">
              <Image
                className="lazyload"
                sizes="(max-width: 328px) 100vw, 328px"
                width={328}
                height={246}
                alt="feature office"
                src={office.thumbnailUrl}
              />
              <div className="wrap-tag">
                <div className="d-flex gap_4 flex-column">
                  {office.category?.map((cat, index) => (
                    <span
                      key={index}
                      className="tag categories text-caption-2 text_white"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="tag time text-caption-2 text_white">
                  <i className="icon-ChatsCircle" /> {office.status[0]}
                </div>
              </div>
              <a
                href={`https://wa.me/96171601751`}
                target="_blank"
                className="overlay-link"
              ></a>
            </div>
          ) : (
            ""
          )}
          <div className="content">
            <h5 className="title mb_8">
              <Link href={`#`} className="line-clamp-2 link">
                {office.title}
              </Link>
            </h5>

            <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase mb_12">
              <li>
                <span className="text_secodary2-color">Location:</span>
                {office.location}
              </li>
              <li>
                <span className="text_secodary2-color">Team Size:</span>
                {office.teamNb}
              </li>
              <li>
                <span className="text_secodary2-color">Email:</span>
                {office.email}
              </li>
            </ul>

            <div className="d-flex">
              <div className="d-flex gap_12 align-items-center">
                {office.instagram && (
                  <p className="text-body-1 line-clamp-2">
                    <a
                      href={office.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-item text-body-3 fw-7"
                    >
                      <i className="icon-InstagramLogo" />
                    </a>
                  </p>
                )}
                {office.linkedin && (
                  <p className="text-body-1 line-clamp-2">
                    <a
                      href={office.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-item text-body-3 fw-7"
                    >
                      <i className="bi-linkedin" />
                    </a>
                  </p>
                )}
                {office.locationMap && (
                  <p className="text-body-1 line-clamp-2">
                    <a
                      href={office.locationMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-item text-body-3 fw-7"
                    >
                      <i className="icon-MapPin" />
                    </a>
                  </p>
                )}
                {office.email && (
                  <p className="text-body-1 line-clamp-2">
                    <a
                      href={`mailto:${office.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-item text-body-3 fw-7"
                    >
                      <i className="icon-gmail" />
                    </a>
                  </p>
                )}
              </div>
              <div className="d-flex justify-content-center w-100">
                <p className="text-body-1 line-clamp-2">
                  <a
                    href={`https://handiz.org/arch-offices`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item text-body-3 fw-7"
                  >
                    <i className="icon-share2" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
