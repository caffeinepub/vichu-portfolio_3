import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useProjects } from "../hooks/useQueries";
import BlobImage from "./BlobImage";

const GRADIENTS = [
  "from-blue-500/20 to-indigo-500/10",
  "from-violet-500/20 to-purple-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
];

export default function ProjectsSection() {
  const { data: projects = [] } = useProjects();
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
            Work
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Projects
          </h2>
        </motion.div>
        {projects.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground rounded-2xl border border-dashed border-border"
            data-ocid="projects.empty_state"
          >
            <p className="text-lg font-medium">No projects yet</p>
            <p className="text-sm mt-1">
              Open the admin panel to add your projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group border border-border"
                data-ocid={`projects.item.${i + 1}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  {project.imageId ? (
                    <BlobImage
                      imageId={project.imageId}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallback={
                        <div
                          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                        />
                      }
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 w-full h-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-base leading-tight">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/70 transition-colors flex-shrink-0"
                        data-ocid={`projects.link.${i + 1}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
                    {project.description}
                  </p>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {project.purpose}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
