'use client';

import { motion } from 'framer-motion';
import { Code, Layers, Zap, Award } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GlassCard from '@/components/ui/GlassCard';
import { stats } from '@/data/resume';

/* ── Strengths data ─────────────────────────────────────── */

const strengths = [
  { icon: Layers, text: 'Backend Architecture' },
  { icon: Code, text: 'API Design' },
  { icon: Zap, text: 'Performance Optimization' },
  { icon: Award, text: 'Clean Code' },
];

/* ── Animation variants ─────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

/* ── Component ──────────────────────────────────────────── */

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="About Me" subtitle="Get to know me better" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Left column ──────────────────────────────── */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Professional intro */}
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-gray-300 text-lg leading-relaxed"
            >
              I&apos;m a passionate{' '}
              <span className="text-cyan-400 font-semibold">.NET developer</span>{' '}
              with a deep love for building scalable, maintainable enterprise systems.
              From crafting robust RESTful APIs to designing database architectures that
              handle millions of transactions, I thrive on turning complex business
              requirements into elegant, performant software solutions.
            </motion.p>

            {/* Career journey */}
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-gray-400 leading-relaxed"
            >
              My programming journey started during my B.Tech in Computer Science, where
              I fell in love with problem-solving and algorithms. Over the past{' '}
              <span className="text-white font-medium">2+ years</span> working at the
              enterprise level on{' '}
              <span className="text-purple-400 font-medium">Keka HR</span>, I&apos;ve
              honed my skills in the .NET ecosystem, cloud-native development with Azure,
              and Agile delivery — consistently shipping features that impact thousands of
              organisations and millions of users.
            </motion.p>

            {/* Strengths */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
            >
              {strengths.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column — stats grid ────────────────── */}
          <motion.div
            className="grid grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <GlassCard
                  className="flex flex-col items-center justify-center py-8"
                  glow={false}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
