"use client";

import {
  formatOfficeExternalLink,
  formatOfficeLocation,
  isOfficeHiring,
} from "@/lib/offices";
import type { Office } from "@/types/office";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";

type OfficeSocialLink = {
  key: string;
  href: string;
  ariaLabel: string;
  icon: ReactNode;
};

type OfficeCard1Props = {
  office: Office;
  onOpen?: (office: Office) => void;
};

export default function OfficeCard1({ office, onOpen }: OfficeCard1Props) {
  if (!isOfficeHiring(office)) {
    return null;
  }

  const locationLabel = formatOfficeLocation(office.location);
  const hiringStatus =
    office.status?.find((s) => s === "Hiring") ?? office.status?.[0] ?? "";

  const openDetail = () => onOpen?.(office);

  const website = formatOfficeExternalLink(office.link);
  const shareText = `Check out this office details:
Title: ${office.title}
Location: ${locationLabel}
Team Size: ${office.teamNb}
Email: ${office.email}
${website ? `Website: ${website}` : ""}
${office.instagram ? `Instagram: ${office.instagram}` : ""}
${office.linkedin ? `LinkedIn: ${office.linkedin}` : ""}
${office.locationMap ? `Location Map: ${office.locationMap}` : ""}
`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const socialLinks: OfficeSocialLink[] = [];
  if (office.instagram) {
    socialLinks.push({
      key: "instagram",
      href: office.instagram,
      ariaLabel: "Instagram",
      icon: <i className="icon-InstagramLogo" aria-hidden />,
    });
  }
  if (office.linkedin) {
    socialLinks.push({
      key: "linkedin",
      href: office.linkedin,
      ariaLabel: "LinkedIn",
      icon: <i className="icon-linkedin2" aria-hidden />,
    });
  }
  if (office.email) {
    socialLinks.push({
      key: "email",
      href: `mailto:${office.email}`,
      ariaLabel: "Email",
      icon: <i className="icon-envelop" aria-hidden />,
    });
  }
  if (office.locationMap) {
    socialLinks.push({
      key: "map",
      href: office.locationMap,
      ariaLabel: "Map",
      icon: <i className="icon-MapPin" aria-hidden />,
    });
  }
  if (website) {
    socialLinks.push({
      key: "website",
      href: website,
      ariaLabel: `Visit ${office.title} website`,
      icon: <i className="bi bi-globe2" aria-hidden />,
    });
  }
  socialLinks.push({
    key: "share",
    href: shareUrl,
    ariaLabel: "Share",
    icon: <i className="icon-share2" aria-hidden />,
  });

  return (
    <div className="feature-post-item style-default hover-image-translate mb_24">
      {office.thumbnailUrl ? (
        <div className="img-style mb_24">
          <Image
            className="lazyload"
            sizes="(max-width: 328px) 100vw, 328px"
            width={328}
            height={246}
            alt={office.title}
            src={office.thumbnailUrl}
          />
          <div className="wrap-tag">
            <div className="d-flex gap_4 flex-column">
              {office.category?.map((cat) => (
                <span
                  key={cat}
                  className="tag categories text-caption-2 text_white"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="tag time text-caption-2 text_white">
              <i className="icon-ChatsCircle" /> {hiringStatus}
            </div>
          </div>
          <button
            type="button"
            className="overlay-link"
            aria-label={`View ${office.title}`}
            onClick={openDetail}
            style={{
              border: "none",
              padding: 0,
              background: "transparent",
              cursor: "pointer",
            }}
          />
        </div>
      ) : null}
      <div className="content">
        <h5 className="title mb_8">
          <button
            type="button"
            onClick={openDetail}
            className="link line-clamp-2 text-start w-100 border-0 bg-transparent p-0"
            style={{ cursor: "pointer" }}
          >
            {office.title}
          </button>
        </h5>

        <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase mb_12">
          <li>
            <span className="text_secodary2-color">Location:</span>
            {locationLabel}
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

        <div className="office-card__social-row">
          {socialLinks.map((link, index) => (
            <Fragment key={link.key}>
              {index > 0 ? (
                <span className="office-card__social-divider" aria-hidden />
              ) : null}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item text-body-3 fw-7"
                aria-label={link.ariaLabel}
              >
                {link.icon}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
