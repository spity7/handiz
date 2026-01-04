"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BlogCard1 from "@/components/blog-cards/BlogCard1";
import StudentProjectCard1 from "@/components/blog-cards/StudentProjectCard1";
import { Project } from "@/types/project";

export default function StudentProjects({
  selectedCategories,
  searchQuery,
}: {
  selectedCategories: string[];
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

  if (loading) return null;

  const filteredProjects = projects.filter((project) => {
    const matchesCategories =
      selectedCategories.length === 0 ||
      project.category?.some((c) => selectedCategories.includes(c));

    const matchesSearch = projectMatchesSearch(project, searchQuery);

    return matchesCategories && matchesSearch;
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

        {/* GRID */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <StudentProjectCard1 project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
