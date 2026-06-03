'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Download, Mail, FolderOpen, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TypeWriter from '@/components/ui/TypeWriter';
import { personalInfo, typewriterStrings } from '@/data/resume';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
});

const RESUME_URL = '/file/AJAY_KEELU_RESUME.pdf';
const RESUME_FILENAME = 'Resume.pdf';

/* ── Animation variants ─────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/* ── Component ──────────────────────────────────────────── */

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = async () => {
    try {
      const response = await fetch(RESUME_URL);
      if (!response.ok) throw new Error('Resume not found');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = RESUME_FILENAME;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0e1225] to-[#0a0a1a]"
    >
      {/* ─ 3D Background ─ */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticleField />
      </div>

      {/* ─ Radial glow accents ─ */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* ─ Content ─ */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={childVariants}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
        >
          <span className="text-lg">👋</span>
          <span className="text-sm text-gray-300 font-medium">
            Welcome to my portfolio
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={childVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4"
        >
          <span className="text-gray-400">Hi, I&apos;m </span>
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={childVariants} className="text-xl md:text-2xl text-cyan-400 mb-6 h-8">
          <TypeWriter strings={typewriterStrings} />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={childVariants}
          className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-10"
        >
          {personalInfo.summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {/* Download Resume */}
          <button
            type="button"
            onClick={downloadResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-shadow"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>

          {/* Contact Me */}
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>

          {/* View Projects */}
          <button
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all"
          >
            <FolderOpen className="w-4 h-4" />
            View Projects
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={childVariants}
          className="flex items-center gap-5"
        >
          <SocialLink href={personalInfo.github} label="GitHub">
            <FaGithub className="w-5 h-5" />
          </SocialLink>
          <SocialLink href={personalInfo.linkedin} label="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </SocialLink>
          <SocialLink href={`mailto:${personalInfo.email}`} label="Email">
            <Mail className="w-5 h-5" />
          </SocialLink>
        </motion.div>
      </motion.div>

      {/* ─ Scroll Indicator ─ */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </motion.div> */}
    </section>
  );
}

/* ── Social link helper ─────────────────────────────────── */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
      whileHover={{
        scale: 1.15,
        borderColor: 'rgba(34,211,238,0.5)',
        boxShadow: '0 0 15px rgba(34,211,238,0.3)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}
