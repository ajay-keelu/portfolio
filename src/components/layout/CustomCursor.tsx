'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const springConfigRing = { damping: 20, stiffness: 300 };

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  useEffect(() => {
    // Check if desktop (no touch)
    const checkDevice = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
      setIsDesktop(!isTouch && isLargeScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Add custom cursor class to body
    document.body.classList.add('custom-cursor-active');

    // Create and inject style
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      .custom-cursor-active,
      .custom-cursor-active * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnterInteractive = () => setIsHovering(true);
    const handleMouseLeaveInteractive = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Monitor interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], [tabindex]'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return interactiveElements;
    };

    const elements = addHoverListeners();

    // Re-scan on DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');

      const existingStyle = document.getElementById('custom-cursor-style');
      if (existingStyle) existingStyle.remove();

      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });

      observer.disconnect();
    };
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: isHovering
            ? 'linear-gradient(135deg, #a855f7, #22d3ee)'
            : 'linear-gradient(135deg, #22d3ee, #a855f7)',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border-2 border-cyan-400/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering
            ? 'rgba(168, 85, 247, 0.5)'
            : 'rgba(34, 211, 238, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
