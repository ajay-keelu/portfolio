'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle,
  Loader2,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

/* ── Form Inputs Interface ────────────────────────────────── */
interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
  botfield?: string;
}

/* ── Animation Variants ─────────────────────────────────────── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    setIsSubmitted(false);
    setIsPreviewMode(false);
    setErrorMessage(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      const isEmailjsConfigured = !!(serviceId && templateId && publicKey);

      if (!isEmailjsConfigured) {
        // Fallback to preview mode if EmailJS keys are not configured in local environment
        console.log('─────────────────────────────────────────────────────────────');
        console.log('📧 CONTACT FORM SUBMISSION (EMAILJS NOT CONFIGURED IN .ENV.LOCAL)');
        console.log(`From: ${data.name} <${data.email}>`);
        console.log(`Subject: ${data.subject}`);
        console.log(`Message: ${data.message}`);
        console.log('─────────────────────────────────────────────────────────────');

        setIsSubmitted(true);
        setIsPreviewMode(true);
        reset();
      } else {
        // Send email client-side via @emailjs/browser
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            DateAndTime: new Date().toLocaleString(),
          },
          {
            publicKey: publicKey,
          }
        );

        setIsSubmitted(true);
        reset();
      }

      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsPreviewMode(false);
      }, 10000);
    } catch (err: any) {
      setErrorMessage(err.text || err.message || 'An unexpected error occurred. Please try again.');
      // Auto-hide error message after 8 seconds
      setTimeout(() => setErrorMessage(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background glow effects */}
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's collaborate! Feel free to reach out for projects, opportunities, or just a chat."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          {/* Left Column: Contact Form (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUpVariants}
          >
            <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-between" glow>
              <h3 className="text-xl font-bold text-white mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 font-medium pl-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 font-medium pl-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-400 font-medium pl-1">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Hi Ajay, I would love to connect and discuss..."
                    {...register('message', { required: 'Message is required' })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors duration-200 resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 font-medium pl-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3.5 px-6 rounded-xl cursor-pointer disabled:opacity-50 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
                {/* Honeypot field for spam prevention */}
                {/* <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    placeholder="If you are human, ignore this field"
                    {...register('botfield')}
                  />
                </div> */}
              </form>

              {/* Success Banner */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "mt-4 p-4 border rounded-xl flex items-start gap-3",
                      isPreviewMode
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    )}
                  >
                    {isPreviewMode ? (
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
                    ) : (
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-sm">
                        {isPreviewMode ? 'Form Verified (Demo Mode)' : 'Message Sent Successfully!'}
                      </p>
                      <p className={cn("text-xs mt-0.5", isPreviewMode ? "text-amber-400/80" : "text-emerald-400/80")}>
                        {isPreviewMode
                          ? 'To receive actual emails, configure your EmailJS credentials in the .env.local file. Check your terminal to view the logged message!'
                          : "Thank you for reaching out. I'll get back to you shortly."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Banner */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Failed to Send Message</p>
                      <p className="text-xs text-red-400/80 mt-0.5">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          {/* Right Column: Contact Info & Decorative Text (5 cols) */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUpVariants}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

              {/* Email */}
              <GlassCard className="p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300" glow={false}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Me</h4>
                  <a
                    href="mailto:ajaykeelu1729@gmail.com"
                    className="text-white hover:text-cyan-400 transition-colors duration-200 font-semibold text-sm sm:text-base"
                  >
                    ajaykeelu1729@gmail.com
                  </a>
                </div>
              </GlassCard>

              {/* LinkedIn */}
              <GlassCard className="p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300" glow={false}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-400 shrink-0">
                  <FaLinkedin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">LinkedIn Profile</h4>
                  <a
                    href="https://linkedin.com/in/ajay-keelu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-400 transition-colors duration-200 font-semibold text-sm sm:text-base"
                  >
                    linkedin.com/in/ajay-keelu
                  </a>
                </div>
              </GlassCard>

              {/* GitHub */}
              <GlassCard className="p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300" glow={false}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-400 shrink-0">
                  <FaGithub className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GitHub Profile</h4>
                  <a
                    href="https://github.com/ajay-keelu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-400 transition-colors duration-200 font-semibold text-sm sm:text-base"
                  >
                    github.com/ajay-keelu
                  </a>
                </div>
              </GlassCard>
            </div>

            {/* Bottom Decorative Text Card */}
            <GlassCard className="p-6 md:p-8 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent border-cyan-500/10 text-center relative overflow-hidden" hover={false}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
              <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                "I am always open to discussing new software development projects, creative ideas, enterprise integrations, or opportunities to be a valuable addition to your engineering team."
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full relative z-10" />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
