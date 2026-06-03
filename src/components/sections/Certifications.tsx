'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Code } from 'lucide-react';
import { SiJavascript, SiHackerrank, SiCodechef, SiGeeksforgeeks, SiLeetcode } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { education, certifications, codingStats } from '@/data/resume';

/* ── Certification Icon Mapper ────────────────────────────── */
const iconMap: Record<string, any> = {
  SiOracle: FaJava,
  SiJavascript: SiJavascript,
  SiHackerrank: SiHackerrank,
  SiCodechef: SiCodechef,
  SiGeeksforgeeks: SiGeeksforgeeks,
  SiLeetcode: SiLeetcode,
};

/* ── Animation Variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-32 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Education & Credentials"
          subtitle="My academic foundation, industry certifications, and coding achievements"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Education & Coding Stats (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Education Sub-section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={containerVariants}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2 pl-1">
                <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
                Education
              </h3>

              <motion.div variants={itemVariants}>
                <GlassCard className="p-6 md:p-8 relative overflow-hidden" glow>
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-bl-full pointer-events-none" />

                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-fit shrink-0">
                      <GraduationCap className="w-8 h-8 text-cyan-400" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                          {education.period}
                        </span>
                        <h4 className="text-xl font-bold text-white mt-2 leading-tight">
                          {education.degree}
                        </h4>
                        <p className="text-gray-300 font-medium mt-1">
                          {education.institution}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {education.location}
                        </p>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                        {education.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Coding Stats Sub-section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={containerVariants}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2 pl-1">
                <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
                Competitive Programming
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {codingStats.map((stat, idx) => {
                  const targetVal = parseInt(stat.count.replace('+', ''));
                  const IconComponent = iconMap[stat.icon] ?? Award;

                  return (
                    <motion.div key={stat.platform} variants={itemVariants}>
                      <GlassCard className="flex flex-col items-center justify-center p-6 text-center h-full relative group">
                        <div className="p-3 rounded-xl bg-white/5 mb-3 group-hover:bg-gradient-to-br group-hover:from-cyan-400/20 group-hover:to-purple-500/20 transition-all duration-300">
                          <a href={stat.profileLink} target="_blank" rel="noopener noreferrer">
                            <IconComponent className="w-6 h-6 text-cyan-400" />
                          </a>
                        </div>
                        <span className="text-gray-300 font-semibold mb-1">
                          {stat.platform}
                        </span>
                        <AnimatedCounter
                          target={targetVal}
                          suffix="+"
                          label={stat.label}
                        />
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Certifications (5 cols on large screens) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2 pl-1">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500" />
              Certifications
            </h3>

            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={containerVariants}
            >
              {certifications.map((cert) => {
                const IconComponent = iconMap[cert.icon] ?? Award;

                return (
                  <motion.div key={cert.id} variants={itemVariants}>
                    <GlassCard className="p-4 flex items-center gap-4 hover:scale-[1.01] transition-all duration-300" glow={false}>
                      <div className="p-2.5 rounded-xl bg-white/5 text-gray-300 shrink-0">
                        <IconComponent className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white truncate text-sm sm:text-base">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Issued by {cert.issuer}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
