import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'fullstack', 'uiux', 'graphic'
  thumbnailUrl: text("thumbnail_url").notNull(),
  liveUrl: text("live_url"), // For fullstack projects
  technologies: text("technologies").array(), // e.g. ["React", "Node.js"]
});

export const projectImages = pgTable("project_images", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
});

// === SCHEMAS ===
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertProjectImageSchema = createInsertSchema(projectImages).omit({ id: true });

// === TYPES ===
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectImage = typeof projectImages.$inferSelect;

export type ProjectWithImages = Project & { images: ProjectImage[] };
