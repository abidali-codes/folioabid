import { Project } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { ExternalLink, Eye, Layers } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isFullStack = project.category === "fullstack";

  const handleAction = () => {
    if (isFullStack && project.liveUrl) {
      window.open(project.liveUrl, "_blank");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      >
        {/* Thumbnail Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <motion.img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Overlay with Action Button */}
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <Button
              onClick={handleAction}
              variant="secondary"
              className="rounded-full px-6 py-6 font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              {isFullStack ? (
                <>
                  View Live <ExternalLink className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  View Details <Eye className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
              {project.category === "uiux" ? "UI/UX Design" : project.category === "fullstack" ? "Full Stack" : "Graphic Design"}
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack / Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs font-medium text-muted-foreground">+{project.technologies.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Detail Modal for UI/UX & Graphics */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-background">
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div>
              <DialogTitle className="text-2xl font-display font-bold">{project.title}</DialogTitle>
              <DialogDescription className="mt-1">{project.description}</DialogDescription>
            </div>
            {/* Close button is handled by DialogPrimitive, but we can add custom actions here if needed */}
          </div>
          
          <div className="p-6 space-y-8">
            {/* Project Gallery */}
            <div className="grid grid-cols-1 gap-6">
              {project.images.map((img, idx) => (
                <motion.div 
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-md border border-border/50 bg-muted"
                >
                  <img 
                    src={img.imageUrl} 
                    alt={`Project detail ${idx + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Tech Specs */}
            {project.technologies && (
              <div className="bg-secondary/50 p-6 rounded-xl">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-background rounded-full text-sm font-medium border border-border shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
