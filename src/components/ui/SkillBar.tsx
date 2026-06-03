'use client';

import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  proficiency?: number;
  delay?: number;
}

export default function SkillBar({
  name,
  proficiency,
  delay = 0,
}: SkillBarProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs font-mono text-gray-500">{proficiency && proficiency + '%'}</span>
      </div>

      {/* Bar container */}
      {proficiency && (
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: delay + 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
