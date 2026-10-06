"use client";

import type { ProjectListItem } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type SearchModalTrendingProps = {
  projects: ProjectListItem[];
  onClose: () => void;
};

function SearchModalTrending({ projects, onClose }: SearchModalTrendingProps) {
  const trending = projects.slice(0, 6);

  return (
    <>
      <div className="tf-line" />
      <div className="trending search-modal-trending">
        <h5 className="title">Trending Now</h5>
        <div className="tf-grid-layout lg-col-3 md-col-2">
          {trending.map((project) => (
            <div
              className="feature-post-item style-small d-flex align-items-center hover-image-rotate item-grid"
              key={project._id}
            >
              <Link
                href={`/student-project/${project._id}`}
                className="img-style"
                onClick={onClose}
              >
                <Image
                  decoding="async"
                  loading="lazy"
                  width={123}
                  height={92}
                  alt={project.title}
                  src={project.thumbnailUrl}
                  style={{ height: "92px" }}
                />
              </Link>
              <div className="content">
                <ul className="meta-feature text-caption-2 fw-7 text_secodary-color d-flex align-items-center mb_8 text-uppercase">
                  <li>{project.student}</li>
                </ul>
                <h6 className="title">
                  <Link
                    href={`/student-project/${project._id}`}
                    className="link"
                    onClick={onClose}
                  >
                    {project.title}
                  </Link>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(SearchModalTrending);
