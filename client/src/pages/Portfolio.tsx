import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Work" },
    { id: "fullstack", label: "Full Stack" },
    { id: "uiux", label: "UI/UX Design" },
    { id: "graphic", label: "Graphic Design" },
  ];

  const filteredProjects = projects?.filter(
    (p) => activeTab === "all" || p.category === activeTab
  ) || [];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            Selected Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground px-4"
          >
            A collection of projects showcasing my journey across development and design.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="overflow-x-auto scrollbar-hide max-w-full">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="inline-flex h-12 bg-secondary/50 p-1 rounded-full border border-border/50 gap-1">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-full px-4 md:px-6 h-10 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all whitespace-nowrap"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                No projects found in this category yet.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
