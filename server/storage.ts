import { db } from "./db";
import { projects, projectImages, type Project, type InsertProject, type ProjectWithImages } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllProjects(): Promise<ProjectWithImages[]>;
  getProject(id: number): Promise<ProjectWithImages | undefined>;
  getProjectsByCategory(category: string): Promise<ProjectWithImages[]>;
  createProject(project: InsertProject): Promise<Project>;
  addProjectImage(projectId: number, imageUrl: string, caption?: string): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllProjects(): Promise<ProjectWithImages[]> {
    const allProjects = await db.select().from(projects);
    const results: ProjectWithImages[] = [];
    
    for (const project of allProjects) {
      const images = await db.select().from(projectImages).where(eq(projectImages.projectId, project.id));
      results.push({ ...project, images });
    }
    
    return results;
  }

  async getProject(id: number): Promise<ProjectWithImages | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    if (!project) return undefined;
    
    const images = await db.select().from(projectImages).where(eq(projectImages.projectId, id));
    return { ...project, images };
  }

  async getProjectsByCategory(category: string): Promise<ProjectWithImages[]> {
    const categoryProjects = await db.select().from(projects).where(eq(projects.category, category));
    const results: ProjectWithImages[] = [];
    
    for (const project of categoryProjects) {
      const images = await db.select().from(projectImages).where(eq(projectImages.projectId, project.id));
      results.push({ ...project, images });
    }
    
    return results;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async addProjectImage(projectId: number, imageUrl: string, caption?: string): Promise<void> {
    await db.insert(projectImages).values({ projectId, imageUrl, caption });
  }

  async seedData(): Promise<void> {
    const existing = await this.getAllProjects();
    if (existing.length > 0) return;

    // Full Stack Projects
    for (let i = 1; i <= 6; i++) {
      const p = await this.createProject({
        title: `E-Commerce Platform ${i}`,
        description: "A full-stack e-commerce solution with payment integration and real-time inventory management.",
        category: "fullstack",
        thumbnailUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        liveUrl: "https://example.com",
        technologies: ["React", "Node.js", "PostgreSQL"],
      });
    }

    // UI/UX Projects
    for (let i = 1; i <= 6; i++) {
      const p = await this.createProject({
        title: `Finance App Redesign ${i}`,
        description: "Complete user experience overhaul for a fintech mobile application focusing on accessibility and clarity.",
        category: "uiux",
        thumbnailUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80",
        technologies: ["Figma", "Prototyping", "User Research"],
      });
      // Add detailed images
      await this.addProjectImage(p.id, "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80", "Dashboard View");
      await this.addProjectImage(p.id, "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80", "Mobile Responsiveness");
      await this.addProjectImage(p.id, "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80", "User Flow");
    }

    // Graphic Design Projects
    for (let i = 1; i <= 6; i++) {
      const p = await this.createProject({
        title: `Brand Identity: Solstice ${i}`,
        description: "Comprehensive branding package including logo design, stationery, and brand guidelines.",
        category: "graphic",
        thumbnailUrl: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&q=80",
        technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
      });
      // Add detailed images
      await this.addProjectImage(p.id, "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&q=80", "Logo Concepts");
      await this.addProjectImage(p.id, "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80", "Business Cards");
    }
  }
}

export const storage = new DatabaseStorage();
