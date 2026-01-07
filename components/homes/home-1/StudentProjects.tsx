"use client";

import { useEffect, useState } from "react";
import StudentProjectCard1 from "@/components/blog-cards/StudentProjectCard1";
import { Project } from "@/types/project";

export default function StudentProjects({
  selectedCategories,
  selectedConcepts,
  selectedTypes,
  searchQuery,
}: {
  selectedCategories: string[];
  selectedConcepts?: string[];
  selectedTypes?: string[];
  searchQuery: string;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const projectMatchesSearch = (project: Project, query: string) => {
    if (!query) return true;

    const searchableText = `
    ${project.title}
    ${project.student}
    ${project.area}
    ${project.description}
    ${project.category?.join(" ")}

    ${project.type?.join(" ")}
    ${project.year?.join(" ")}
    ${project.location?.join(" ")}
    ${project.university?.join(" ")}
  `.toLowerCase();

    return searchableText.includes(query.toLowerCase());
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategories =
      selectedCategories.length === 0 ||
      project.category?.some((c) => selectedCategories.includes(c));

    const matchesConcepts =
      !selectedConcepts ||
      selectedConcepts.length === 0 ||
      project.concept?.some((c) => selectedConcepts.includes(c));

    const matchesTypes =
      !selectedTypes ||
      selectedTypes.length === 0 ||
      project.type?.some((t) => selectedTypes.includes(t));

    const matchesSearch = projectMatchesSearch(project, searchQuery);

    return (
      matchesCategories && matchesConcepts && matchesTypes && matchesSearch
    );
  });

  return (
    <div
      className="section-most-popular tf-spacing-1"
      style={{ paddingTop: "0px" }}
    >
      <div className="tf-container sw-layout">
        <div className="heading-section d-flex justify-content-between mb_28">
          <h3>Student Projects</h3>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div
            style={{
              minHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div className="spinner" />
            <p className="text-body-1">Loading student projects…</p>
          </div>
        )}

        {/* GRID */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <StudentProjectCard1 key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
