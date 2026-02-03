import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed database on startup
  await storage.seedData();

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.get(api.projects.getByCategory.path, async (req, res) => {
    const projects = await storage.getProjectsByCategory(req.params.category);
    res.json(projects);
  });

  return httpServer;
}
