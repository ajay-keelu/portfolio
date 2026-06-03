'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { projects, type Project } from '@/data/resume';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import TechBadge from '@/components/ui/TechBadge';
import ProjectModal from '@/components/ui/ProjectModal';

/* ── Animation variants ──────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/* ── Component ────────────────────────────────────────────── */

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          title="Featured Projects"
          subtitle="Things I have built"
        />

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <GlassCard
                className="group h-full flex flex-col overflow-hidden !p-0"
                hover={false}
                whileHover={{
                  y: -4,
                  boxShadow: '0 0 25px rgba(34,211,238,0.15)',
                  borderColor: 'rgba(34,211,238,0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Gradient image area */}
                <div className="relative h-48 rounded-t-2xl overflow-hidden">
                  {/* Gradient background */}
                  <div
                    className="absolute inset-0"
                    style={{ background: project.image }}
                  />
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
                    {project.category}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.span
                      className="flex items-center gap-2 text-white font-semibold text-sm"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </motion.span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  {/* Title & subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-cyan-400 mt-0.5">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-gray-500 font-mono mt-1">
                      {project.period}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-gray-500 bg-white/5 border border-white/10">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 mt-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                        bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold
                        hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-shadow duration-300
                        cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                          bg-white/5 border border-white/10 text-gray-300 text-sm font-medium
                          hover:bg-white/10 hover:text-white hover:border-cyan-400/40
                          transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
