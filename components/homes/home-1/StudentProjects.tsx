"use client";

import StudentProjectCard1 from "@/components/blog-cards/StudentProjectCard1";
import { useProjects } from "@/components/providers/ProjectsProvider";
import StudentProjectsGridSkeleton from "@/components/skeletons/StudentProjectsGridSkeleton";
import { ProjectListItem } from "@/types/project";

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
  const { projects, loading } = useProjects();

  const projectMatchesSearch = (project: ProjectListItem, query: string) => {
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

        {loading ? (
          <StudentProjectsGridSkeleton />
        ) : filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <StudentProjectCard1 key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-body-1 text-center py-5">
            No student projects match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
