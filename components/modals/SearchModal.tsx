"use client";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchModal() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          const sorted = data.projects.sort(
            (a: Project, b: Project) => (a.order || 0) - (b.order || 0)
          );
          setProjects(sorted);
        }
      });
  }, []);

  const closeModal = () => {
    const closeBtn = document.getElementById("close-search-modal");
    if (closeBtn) {
      closeBtn.click();
    } else {
      const dismissBtn = document.querySelector(
        '[data-bs-dismiss="offcanvas"]'
      ) as HTMLButtonElement;
      dismissBtn?.click();
    }
  };

  return (
    <div className="offcanvas offcanvas-top offcanvas-search" id="canvasSearch">
      <button
        className="btn-close-search"
        type="button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i className="icon-X" />
      </button>
      <div className="offcanvas-body">
        <div className="tf-container w-xl">
          <div className="wrap-form">
            <h5 className="title">What are you looking for?</h5>
            <form
              action="#"
              className="form-search"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem(
                  "search"
                ) as HTMLInputElement;
                if (input.value.trim()) {
                  closeModal();

                  window.location.href = `/?search=${encodeURIComponent(
                    input.value.trim()
                  )}`;
                }
              }}
            >
              <fieldset className="input-search">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Searching...."
                />
              </fieldset>
              <div className="btn-submit">
                <button
                  type="submit"
                  className="tf-btn animate-hover-btn btn-switch-text"
                >
                  <span>
                    <span className="btn-double-text" data-text="Search">
                      Search
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="popular-searches">
            <h5 className="title">Popular Searches:</h5>
            <ul className="list d-flex align-items-center flex-wrap">
              <li>
                <a href="#" className="text-body-1 text_on-surface-color fw-7">
                  Magazine
                </a>
              </li>
              <li>
                <a href="#" className="text-body-1 text_on-surface-color fw-7">
                  Life Style
                </a>
              </li>
              <li>
                <a href="#" className="text-body-1 text_on-surface-color fw-7">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-body-1 text_on-surface-color fw-7">
                  Entertainment
                </a>
              </li>
              <li>
                <a href="#" className="text-body-1 text_on-surface-color fw-7">
                  Tech Ai
                </a>
              </li>
            </ul>
          </div>

          <div className="tf-line" />

          <div className="trending">
            <h5 className="title">Trending Now</h5>
            <div className="tf-grid-layout lg-col-3 md-col-2">
              {projects.slice(0, 6).map((project, index) => (
                <div
                  className="feature-post-item style-small d-flex align-items-center hover-image-rotate item-grid"
                  key={index}
                >
                  <Link
                    href={`/student-project/${project._id}`}
                    className="img-style"
                    onClick={closeModal}
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
                      {/* <li>
                        <a href="#" className="text-uppercase">
                          {project.author}
                        </a>
                      </li> */}
                    </ul>
                    <h6 className="title">
                      <Link
                        href={`/student-project/${project._id}`}
                        className="link"
                        onClick={closeModal}
                      >
                        {project.title}
                      </Link>
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
