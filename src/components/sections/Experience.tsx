'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import { experiences } from '@/data/resume';

/* ── Component ──────────────────────────────────────────── */

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Professional Experience"
          subtitle="My career journey"
        />

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="relative">
          {/* Vertical line — desktop (center), mobile (left) */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background:
                'linear-gradient(to bottom, #22d3ee, #a855f7, transparent)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}

          {/* ── Project highlights ────────────────────────── */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h3 className="text-xl font-bold text-center mb-8">
              <span className="gradient-text">Key Projects @ Tezo</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hiro Module */}
              <ProjectHighlight
                title="Hiro Module"
                subtitle="Advanced HRMS Platform"
                description="Architected and developed end-to-end payroll, attendance, and employee management features serving thousands of organisations using ASP.NET Core Web API and Angular."
                highlights={[
                  'Reduced API response times by 40%',
                  'Multi-tenant architecture (1000+ orgs)',
                  'Enterprise-grade RBAC security',
                ]}
                techs={['C#', '.NET Core', 'Angular', 'SQL Server', 'Azure']}
              />

              {/* Demo System */}
              <ProjectHighlight
                title="Demo Project"
                subtitle="Client Demo System"
                description="Built an automated demo environment provisioning tool enabling sales teams to spin up fully configured Keka instances, cutting client onboarding time by 60%."
                highlights={[
                  'One-click demo provisioning',
                  '60% faster client onboarding',
                  'Automated cleanup & resource reclamation',
                ]}
                techs={['C#', 'ASP.NET MVC', 'Azure DevOps', 'EF Core']}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Project highlight card ─────────────────────────────── */

function ProjectHighlight({
  title,
  subtitle,
  description,
  highlights,
  techs,
}: {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techs: string[];
}) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      whileHover={{
        borderColor: 'rgba(34,211,238,0.4)',
        boxShadow: '0 0 20px rgba(34,211,238,0.15)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <h4 className="text-lg font-bold text-white">{title}</h4>
      <p className="text-sm text-purple-400 font-medium mt-0.5">{subtitle}</p>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">{description}</p>

      <ul className="mt-4 space-y-1.5">
        {highlights.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-300">
            <span className="text-cyan-400 shrink-0">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-4">
        {techs.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
