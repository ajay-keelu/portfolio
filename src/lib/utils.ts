// ─────────────────────────────────────────────────────────────
// Utility Functions — Ajay Keelu's Portfolio
// ─────────────────────────────────────────────────────────────

/**
 * Merges class names conditionally — a lightweight alternative to clsx/classnames.
 * Filters out falsy values (undefined, null, false, empty string) and joins the rest.
 *
 * @example
 * cn('base', isActive && 'active', isDisabled && 'opacity-50')
 * // => "base active" (when isActive is true, isDisabled is false)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Clamps a number between a min and max value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linearly interpolates between two values.
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Formats a number with a suffix (e.g. 330 + "+" => "330+").
 */
export function formatStat(value: number, suffix: string): string {
  return `${value}${suffix}`;
}
