import { z } from "zod";

const projectImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  caption: z.string().optional(),
});

const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["fullstack", "uiux", "graphic", "animation"]),
  subCategory: z.enum(["logo", "package", "social", "other"]).optional(),
  thumbnailUrl: z.string(),
  liveUrl: z.string().nullable().optional(),
  technologies: z.array(z.string()).nullable().optional(),
  images: z.array(projectImageSchema),
});

export const api = {
  projects: {
    list: {
      method: "GET" as const,
      path: "/api/projects",
      responses: {
        200: z.array(projectSchema),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/projects/:id",
      responses: {
        200: projectSchema,
        404: z.object({ message: z.string() }),
      },
    },
    getByCategory: {
      method: "GET" as const,
      path: "/api/projects/category/:category",
      responses: {
        200: z.array(projectSchema),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
