'use client';

import { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useTransform,
  motion,
  animate,
} from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, target, {
        duration,
        ease: 'easeOut',
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, target, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <div className="flex items-baseline">
        <motion.span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {rounded}
        </motion.span>
        {suffix && (
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {suffix}
          </span>
        )}
      </div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}
