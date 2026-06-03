'use client';

import { motion } from 'framer-motion';
import {
  Code,
  Server,
  Monitor,
  Database,
  Cloud,
  Wrench,
  Layout,
  type LucideIcon,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import SkillBar from '@/components/ui/SkillBar';
import TechBadge from '@/components/ui/TechBadge';
import { skillCategories } from '@/data/resume';

/* ── Icon map ───────────────────────────────────────────── */

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Code,
  Backend: Server,
  Frontend: Monitor,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  Tools: Wrench,
  'Architecture & Concepts': Layout,
};

/* ── Floating badges ────────────────────────────────────── */

const floatingTechs = [
  'C#',
  '.NET Core',
  'Angular',
  'React',
  'SQL Server',
  'Azure',
  'TypeScript',
  'Redis',
  'REST API',
];

/* ── Animation variants ─────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ── Component ──────────────────────────────────────────── */

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with"
        />

        {/* ── Skill category grid ────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.title] ?? Code;

            return (
              <motion.div key={category.title} variants={cardVariants}>
                <GlassCard className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-3 flex-1">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                      // proficiency={skill.proficiency}
                      />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Floating tech badges ───────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {floatingTechs.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
