"use client";
import { useProjects } from "@/components/providers/ProjectsProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchModal() {
  const {
    projects,
    categories: availableCategories,
    concepts: availableConcepts,
    types: availableTypes,
  } = useProjects();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Track dark mode by observing the class on document.body
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Initialize logic
    const checkDarkMode = () => {
      if (typeof document !== "undefined" && document.body) {
        setIsDark(document.body.classList.contains("dark-mode"));
      }
    };

    // Initial check
    checkDarkMode();

    // 2. Setup observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkMode();
        }
      });
    });

    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, {
        attributes: true, // subscribe to attribute changes
      });
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  const closeModal = () => {
    const closeBtn = document.getElementById("close-search-modal");
    if (closeBtn) {
      closeBtn.click();
    } else {
      const dismissBtn = document.querySelector(
        '[data-bs-dismiss="offcanvas"]',
      ) as HTMLButtonElement;
      dismissBtn?.click();
    }
  };

  const toggleFilter = (
    item: string,
    selected: string[],
    setSelected: (s: string[]) => void,
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  // Helper for style logic
  const getFilterStyle = (isActive: boolean) => ({
    backgroundColor: isDark
      ? isActive
        ? "#ffffff"
        : "transparent"
      : isActive
        ? "#000000"
        : "transparent",
    color: isDark
      ? isActive
        ? "#000000"
        : "#ffffff" // Ensure visible text in dark mode
      : isActive
        ? "#ffffff"
        : "#000000", // Ensure visible text in light mode
    border: isDark ? "1px solid white" : "1px solid black",
    padding: "4px 12px", // Added padding for better look with border
    borderRadius: "4px", // Rounded corners
    transition: "all 0.3s ease",
  });

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
                  "search",
                ) as HTMLInputElement;

                const params = new URLSearchParams();
                if (input.value.trim()) {
                  params.set("search", input.value.trim());
                }
                if (selectedCategories.length > 0) {
                  params.set("categories", selectedCategories.join(","));
                }
                if (selectedConcepts.length > 0) {
                  params.set("concepts", selectedConcepts.join(","));
                }
                if (selectedTypes.length > 0) {
                  params.set("types", selectedTypes.join(","));
                }

                closeModal();
                window.location.href = `/?${params.toString()}`;
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

          <div className="popular-searches mb_16">
            <h5 className="title">Categories:</h5>
            <ul
              className="list d-flex align-items-center flex-wrap"
              style={{ gap: "8px" }}
            >
              {availableCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="text-body-1 fw-7"
                    style={getFilterStyle(selectedCategories.includes(cat))}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFilter(
                        cat,
                        selectedCategories,
                        setSelectedCategories,
                      );
                    }}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="popular-searches mb_16">
            <h5 className="title">Concepts:</h5>
            <ul
              className="list d-flex align-items-center flex-wrap"
              style={{ gap: "8px" }}
            >
              {availableConcepts.map((concept) => (
                <li key={concept}>
                  <a
                    href="#"
                    className="text-body-1 fw-7"
                    style={getFilterStyle(selectedConcepts.includes(concept))}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFilter(
                        concept,
                        selectedConcepts,
                        setSelectedConcepts,
                      );
                    }}
                  >
                    {concept}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="popular-searches">
            <h5 className="title">Types:</h5>
            <ul
              className="list d-flex align-items-center flex-wrap"
              style={{ gap: "8px" }}
            >
              {availableTypes.map((type) => (
                <li key={type}>
                  <a
                    href="#"
                    className="text-body-1 fw-7"
                    style={getFilterStyle(selectedTypes.includes(type))}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFilter(type, selectedTypes, setSelectedTypes);
                    }}
                  >
                    {type}
                  </a>
                </li>
              ))}
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
