'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
      <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
    </motion.div>
  );
}
