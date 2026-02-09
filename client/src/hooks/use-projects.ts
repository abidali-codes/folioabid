import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Re-export types for convenience
export type Project = {
  id: number;
  title: string;
  description: string;
  category: "fullstack" | "uiux" | "graphic" | "animation";
  subCategory?: "logo" | "package" | "social" | "other";
  thumbnailUrl: string;
  liveUrl: string | null;
  technologies: string[] | null;
  images: { id: number; imageUrl: string }[];
};

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      return api.projects.list.responses[200].parse(data);
    },
  });
}

export function useProjectsByCategory(category: string) {
  return useQuery({
    queryKey: [api.projects.getByCategory.path, category],
    queryFn: async () => {
      const url = buildUrl(api.projects.getByCategory.path, { category });
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${category} projects`);
      const data = await res.json();
      return api.projects.getByCategory.responses[200].parse(data);
    },
    enabled: !!category,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: [api.projects.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.projects.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      return api.projects.get.responses[200].parse(data);
    },
    enabled: !!id,
  });
}
