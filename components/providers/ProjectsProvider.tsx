"use client";

import { ProjectListItem } from "@/types/project";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ProjectsContextValue = {
  projects: ProjectListItem[];
  loading: boolean;
  categories: string[];
  concepts: string[];
  types: string[];
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}projects/list`)
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          const sorted = [...data.projects].sort(
            (a: ProjectListItem, b: ProjectListItem) =>
              (a.order || 0) - (b.order || 0),
          );
          setProjects(sorted);
        }
      })
      .catch((err) => {
        console.error("Failed to load projects", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(projects.flatMap((p) => p.category ?? [])),
      ),
    [projects],
  );

  const concepts = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((p) => p.concept ?? []))),
    [projects],
  );

  const types = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.type ?? []))),
    [projects],
  );

  return (
    <ProjectsContext.Provider
      value={{ projects, loading, categories, concepts, types }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
}
