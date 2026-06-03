'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import type { Experience } from '@/data/resume';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function TimelineItem({ experience, index, isLast = false }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="relative flex flex-col md:flex-row items-start md:items-center w-full mb-12"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Desktop: left content */}
      <div
        className={`hidden md:flex w-1/2 ${
          isLeft ? 'justify-end pr-12' : 'justify-end pr-12 order-2'
        }`}
      >
        {isLeft && <TimelineContent experience={experience} align="right" />}
        {!isLeft && <div />}
      </div>

      {/* Center dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Briefcase className="w-4 h-4 text-white" />
        </motion.div>
        {!isLast && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-cyan-400/50 to-transparent md:hidden" />
        )}
      </div>

      {/* Desktop: right content */}
      <div
        className={`hidden md:flex w-1/2 ${
          !isLeft ? 'justify-start pl-12 order-1' : 'justify-start pl-12'
        }`}
      >
        {!isLeft && <TimelineContent experience={experience} align="left" />}
        {isLeft && <div />}
      </div>

      {/* Mobile content */}
      <div className="md:hidden pl-16 w-full">
        <TimelineContent experience={experience} align="left" />
      </div>
    </motion.div>
  );
}

function TimelineContent({
  experience,
  align,
}: {
  experience: Experience;
  align: 'left' | 'right';
}) {
  return (
    <motion.div
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-lg w-full ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
      whileHover={{
        borderColor: 'rgba(34,211,238,0.4)',
        boxShadow: '0 0 20px rgba(34,211,238,0.15)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Period */}
      <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
        {experience.period}
      </span>

      {/* Role & Company */}
      <h3 className="text-xl font-bold text-white mt-2">{experience.role}</h3>
      <p className="text-purple-400 font-medium text-sm mt-0.5">
        {experience.company} &bull; {experience.location}
      </p>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
        {experience.description}
      </p>

      {/* Achievements */}
      <ul className={`mt-4 space-y-2 ${align === 'right' ? 'text-left' : ''}`}>
        {experience.achievements.slice(0, 4).map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-300">
            <span className="text-cyan-400 mt-1 shrink-0">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className={`flex flex-wrap gap-2 mt-4 ${align === 'right' ? 'justify-end' : ''}`}>
        {experience.technologies.slice(0, 8).map((tech) => (
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
