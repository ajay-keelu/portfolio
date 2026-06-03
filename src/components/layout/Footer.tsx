'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/ajay-keelu', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/ajay-keelu', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ajaykeelu1729@gmail.com', label: 'Email' },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer className="relative bg-[#0a0a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Left: Name + Tagline */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Ajay Keelu
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Crafting exceptional digital experiences with modern web technologies.
                Let&apos;s build something amazing together.
              </p>
              <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
            </div>

            {/* Center: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Social Icons */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Open to opportunities &amp; collaborations
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="center text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Ajay Keelu. All rights reserved.
            </p>
            {/* <p className="text-gray-600 text-xs">
              Designed &amp; Built with{' '}
              <span className="text-cyan-400">&hearts;</span> using Next.js
            </p> */}
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-lg border border-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:border-cyan-400/30 transition-all duration-300 group"
          >
            {/* Gradient border ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity" />
            <span className="absolute inset-[2px] rounded-full bg-[#0a0a1a]" />
            <ArrowUp size={18} className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
