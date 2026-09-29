"use client";

import {
  formatOfficeExternalLink,
  formatOfficeLocation,
  getOfficeLinkLabel,
} from "@/lib/offices";
import type { Office } from "@/types/office";
import Image from "next/image";
import { useCallback, useEffect } from "react";

type OfficeDetailModalProps = {
  office: Office;
  onClose: () => void;
};

const HANDIZ_WHATSAPP = "https://wa.me/96171601751";

function isDisplayableEmail(email?: string): boolean {
  const value = email?.trim();
  if (!value || value === "#") return false;
  return value.includes("@");
}

function buildShareText(office: Office, locationLabel: string) {
  const website = formatOfficeExternalLink(office.link);
  return `Check out this office on Handiz:
Title: ${office.title}
Location: ${locationLabel}
Team Size: ${office.teamNb}
Email: ${office.email}
${website ? `Website: ${website}` : ""}
${office.instagram ? `Instagram: ${office.instagram}` : ""}
${office.linkedin ? `LinkedIn: ${office.linkedin}` : ""}
${office.locationMap ? `Location Map: ${office.locationMap}` : ""}
`;
}

function buildContactHandizMessage(office: Office, locationLabel: string) {
  const website = formatOfficeExternalLink(office.link);
  const lines = [
    "Hi Handiz,",
    "",
    "I'm reaching out about this office from Arch Offices:",
    "",
    `Office: ${office.title}`,
    `Location: ${locationLabel}`,
    `Team size: ${office.teamNb}`,
  ];
  if (isDisplayableEmail(office.email)) {
    lines.push(`Email: ${office.email.trim()}`);
  }
  if (website) {
    lines.push(`Website: ${website}`);
  }
  lines.push("", "I'd like to learn more. Thank you!");
  return lines.join("\n");
}

function handizWhatsAppUrl(text: string) {
  return `${HANDIZ_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export default function OfficeDetailModal({
  office,
  onClose,
}: OfficeDetailModalProps) {
  const locationLabel = formatOfficeLocation(office.location);
  const hiringStatus =
    office.status?.find((s) => s === "Hiring") ?? office.status?.[0] ?? "";
  const websiteHref = formatOfficeExternalLink(office.link);
  const websiteLabel = getOfficeLinkLabel(office.link);
  const hasEmail = isDisplayableEmail(office.email);
  const showTeamSize =
    typeof office.teamNb === "number" && Number.isFinite(office.teamNb);
  const showDetails = Boolean(locationLabel) || showTeamSize;
  const shareText = buildShareText(office, locationLabel);
  const contactHandizHref = handizWhatsAppUrl(
    buildContactHandizMessage(office, locationLabel),
  );

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [close]);

  const primaryCategory = office.category?.[0];

  return (
    <div
      className="modal fade show d-block ai-prompt-modal-backdrop"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="office-detail-modal-title"
      onClick={close}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable ai-prompt-modal office-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content ai-prompt-modal__panel shadow-lg">
          <div className="modal-header ai-prompt-modal__header office-modal__header border-0 pb-0">
            <div className="office-modal__header-row">
              <h5
                className="modal-title office-modal__title mb-0 text-break"
                id="office-detail-modal-title"
              >
                {office.title}
              </h5>
              <div className="office-modal__header-badges">
                {hiringStatus ? (
                  <span className="office-modal__header-badge office-modal__header-badge--hiring text-uppercase">
                    <i className="icon-ChatsCircle" aria-hidden />
                    {hiringStatus}
                  </span>
                ) : null}
                {primaryCategory ? (
                  <span className="office-modal__header-badge text-uppercase">
                    {primaryCategory}
                  </span>
                ) : null}
                {office.category?.slice(1).map((cat) => (
                  <span
                    key={cat}
                    className="office-modal__header-badge text-uppercase"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="btn-close ai-prompt-modal__close office-modal__close"
                aria-label="Close"
                onClick={close}
              />
            </div>
          </div>

          <div className="modal-body ai-prompt-modal__body pt-3">
            {office.thumbnailUrl ? (
              <div className="ai-prompt-modal-thumb ai-prompt-modal-thumb--contain mb-3">
                <Image
                  fill
                  src={office.thumbnailUrl}
                  alt=""
                  sizes="(max-width: 991px) 100vw, 800px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : null}

            {showDetails ? (
              <div className="ai-prompt-modal__desc-section office-modal__details-section">
                <div className="office-modal__details-grid">
                  {locationLabel ? (
                    <div className="office-modal__detail-item">
                      <span className="office-modal__detail-label text-uppercase">
                        Location:
                      </span>
                      {office.locationMap ? (
                        <a
                          href={office.locationMap}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="office-modal__meta-value"
                        >
                          <i className="icon-MapPin" aria-hidden />
                          <span>{locationLabel}</span>
                        </a>
                      ) : (
                        <p className="office-modal__meta-value mb-0">
                          <i className="icon-MapPin" aria-hidden />
                          <span>{locationLabel}</span>
                        </p>
                      )}
                    </div>
                  ) : null}
                  {showTeamSize ? (
                    <div className="office-modal__detail-item">
                      <span className="office-modal__detail-label text-uppercase">
                        Team size:
                      </span>
                      <p className="office-modal__meta-value mb-0">
                        <i className="bi bi-people" aria-hidden />
                        <span>{office.teamNb}</span>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="ai-prompt-modal__desc-section office-modal__connect-section">
              <span className="ai-prompt-modal__desc-label text-uppercase d-block">
                Connect
              </span>
              <div className="office-modal__connect-row d-flex flex-wrap gap-2">
                {hasEmail ? (
                  <a
                    href={`mailto:${office.email.trim()}`}
                    className="btn ai-prompt-modal__copy-btn office-modal__chip-btn d-inline-flex align-items-center gap-2"
                  >
                    <i className="icon-envelop" aria-hidden />
                    Email
                  </a>
                ) : null}
                {office.instagram ? (
                  <a
                    href={office.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ai-prompt-modal__copy-btn office-modal__chip-btn d-inline-flex align-items-center gap-2"
                  >
                    <i className="icon-InstagramLogo" aria-hidden />
                    Instagram
                  </a>
                ) : null}
                {office.linkedin ? (
                  <a
                    href={office.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ai-prompt-modal__copy-btn office-modal__chip-btn d-inline-flex align-items-center gap-2"
                  >
                    <i className="icon-linkedin2" aria-hidden />
                    LinkedIn
                  </a>
                ) : null}
                {office.locationMap ? (
                  <a
                    href={office.locationMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ai-prompt-modal__copy-btn office-modal__chip-btn d-inline-flex align-items-center gap-2"
                  >
                    <i className="icon-MapPin" aria-hidden />
                    Map
                  </a>
                ) : null}
                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn ai-prompt-modal__copy-btn office-modal__chip-btn d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-globe2" aria-hidden />
                    Website
                  </a>
                ) : null}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ai-prompt-modal__copy-btn office-modal__chip-btn d-inline-flex align-items-center gap-2"
                >
                  <i className="icon-share2" aria-hidden />
                  Share
                </a>
              </div>
            </div>

            <div className="office-modal__footer-actions">
              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="office-modal__footer-btn office-modal__footer-btn--primary"
                >
                  <i className="bi bi-box-arrow-up-right" aria-hidden />
                  <span>Visit {websiteLabel}</span>
                </a>
              ) : hasEmail ? (
                <a
                  href={`mailto:${office.email.trim()}`}
                  className="office-modal__footer-btn office-modal__footer-btn--primary"
                >
                  <i className="icon-envelop" aria-hidden />
                  <span>Email studio</span>
                </a>
              ) : null}
              <a
                href={contactHandizHref}
                target="_blank"
                rel="noopener noreferrer"
                className="office-modal__footer-btn office-modal__footer-btn--whatsapp"
              >
                <i className="bi bi-whatsapp" aria-hidden />
                <span>Contact Handiz</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
