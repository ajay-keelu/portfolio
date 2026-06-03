'use client';

import { motion } from 'framer-motion';

interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <motion.span
      className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-gray-300 font-medium cursor-default"
      whileHover={{
        scale: 1.08,
        borderColor: 'rgba(34,211,238,0.5)',
        boxShadow: '0 0 15px rgba(34,211,238,0.3)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {name}
    </motion.span>
  );
}
