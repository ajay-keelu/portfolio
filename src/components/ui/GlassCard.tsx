'use client';

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  glowColor = 'rgba(34,211,238,0.3)',
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${
        glow ? `shadow-[0_0_15px_${glowColor}]` : ''
      } ${className}`}
      style={glow ? { boxShadow: `0 0 15px ${glowColor}` } : undefined}
      whileHover={
        hover
          ? {
              scale: 1.02,
              borderColor: 'rgba(34,211,238,0.5)',
              boxShadow: `0 0 20px ${glowColor}`,
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
