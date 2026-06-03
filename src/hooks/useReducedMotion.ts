'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Detects whether the user has requested reduced motion via their OS
 * accessibility settings (`prefers-reduced-motion: reduce`).
 *
 * SSR-safe — returns `false` during server rendering so animations
 * are enabled by default and gracefully disabled on the client when
 * the preference is detected.
 *
 * Use this to conditionally skip or simplify Framer Motion / Three.js
 * animations for accessibility compliance.
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * const variants = prefersReducedMotion ? {} : fadeInVariants;
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export default useReducedMotion;
