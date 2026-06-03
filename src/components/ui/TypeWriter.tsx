'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypeWriter({
  strings,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1500,
}: TypeWriterProps) {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentString = strings[stringIndex];

    if (!isDeleting) {
      // Typing
      setText(currentString.slice(0, text.length + 1));
      if (text.length + 1 === currentString.length) {
        // Finished typing — pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      // Deleting
      setText(currentString.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        return;
      }
    }
  }, [text, stringIndex, isDeleting, strings, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {text}
      </span>
      <motion.span
        className="ml-0.5 inline-block w-[2px] h-[1em] bg-cyan-400"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </span>
  );
}
