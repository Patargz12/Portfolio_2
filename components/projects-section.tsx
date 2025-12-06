"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  LayoutGrid,
  ExternalLink,
  Github,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projectsData } from "@/constants/projects-section";

export type { Project };

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-500 h-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 -z-10 blur-xl"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ x: Math.random() * 100, y: 100, opacity: 0 }}
              animate={
                isHovered
                  ? {
                      x: Math.random() * 100,
                      y: -20,
                      opacity: [0, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>

        {/* Image container with parallax effect */}
        <div className="relative h-56 overflow-hidden bg-muted">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 to-transparent" />

          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 shadow-lg shadow-primary/50">
              {project.categories[0] ?? "Project"}
            </Badge>
          </motion.div>

          {/* Links overlay */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <motion.h3
            className="text-2xl font-bold text-foreground"
            animate={{
              color: isHovered
                ? "hsl(var(--primary))"
                : "hsl(var(--foreground))",
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags with stagger animation */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-accent/20 backdrop-blur-sm text-foreground hover:bg-accent/40 hover:text-accent transition-all duration-300 cursor-default border border-accent/30"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

interface ProjectsProps {
  projects?: Project[];
  projectsPerPage?: number;
}

export const Projects = ({
  projects = projectsData.projects,
  projectsPerPage = projectsData.projectsPerPage,
}: ProjectsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / projectsPerPage)
  );
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (validCurrentPage < totalPages) {
      goToPage(validCurrentPage + 1);
    }
  };

  const prevPage = () => {
    if (validCurrentPage > 1) {
      goToPage(validCurrentPage - 1);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projectsData.header.title}{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {projectsData.header.highlightedWord}
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {projectsData.header.subtitle}
          </motion.p>
        </motion.div>

        {/* Category filters and view toggle */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {projectsData.categories.map((category: string, index: number) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                    : "bg-secondary/50 text-foreground hover:bg-primary/20 hover:text-primary"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`${
                viewMode === "grid" ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("masonry")}
              className={`${
                viewMode === "masonry"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              <Grid3x3 className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            className={`grid gap-8 mb-12 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {paginatedProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-xl">
              No projects found in this category
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={prevPage}
              disabled={validCurrentPage === 1}
              variant="outline"
              size="icon"
              className="border-border hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 bg-transparent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (validCurrentPage <= 3) {
                  page = i + 1;
                } else if (validCurrentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = validCurrentPage - 2 + i;
                }

                return (
                  <motion.div
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={() => goToPage(page)}
                      variant={
                        validCurrentPage === page ? "default" : "outline"
                      }
                      size="icon"
                      className={`w-10 h-10 transition-all duration-300 ${
                        validCurrentPage === page
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                          : "border-border hover:border-primary hover:bg-primary/10"
                      }`}
                    >
                      {page}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            <Button
              onClick={nextPage}
              disabled={validCurrentPage === totalPages}
              variant="outline"
              size="icon"
              className="border-border hover:border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 bg-transparent"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {/* Page indicator with animation */}
        <motion.div
          className="text-center mt-6 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Page {validCurrentPage} of {totalPages} • Showing{" "}
          {paginatedProjects.length} of {filteredProjects.length} projects
        </motion.div>
      </div>
    </section>
  );
};
