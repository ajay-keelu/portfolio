# 🚀 Premium Developer Portfolio — Ajay Keelu

A state-of-the-art, immersive, and fully responsive personal portfolio website built for **Ajay Keelu** (Software Engineer & .NET Developer).

This project showcases a premium web experience utilizing cutting-edge technologies, beautiful visual effects (such as 3D particle fields, glassmorphism, glowing accents, and smooth scroll animations), and comprehensive sections outlining Ajay's experience, projects, skills, education, and credentials.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15+ / 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust types and developer experience
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS variables and nesting
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions, spring transitions, and scroll-triggered animations
- **3D Graphics**: [React Three Fiber](https://r3f.docs.pmnd.rs/) & [@react-three/drei](https://github.com/pmndrs/drei) (powered by Three.js) for high-performance interactive 3D particle systems and geometry wireframes
- **Forms**: [React Hook Form](https://react-hook-form.com/) for optimized form state and client-side validation
- **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/) for high-quality SVG vector graphics

---

## ✨ Features & Visual Highlights

1. **🎭 Premium Loading Screen**: A custom 2.5s loading experience featuring initials pulse animation, gradient progress bar, and elegant entrance easing.
2. **🌌 Interactive 3D Backgrounds**: A dynamic 3D Particle Field running on React Three Fiber. Particles drift upward and react to the user's cursor movements.
3. **🪄 Custom Animated Cursor**: A sleek, desktop-only dynamic cursor with spring physics. The cursor rings scale up, change color, and display hover states when hovering over interactive elements.
4. **🧭 Smart Scroll Progress & ScrollSpy**:
   - A thin, top-aligned progress bar dynamically mapping scroll percentage through Framer Motion hooks.
   - Active section tracking via a custom intersection observer hook, updating the sticky glass navbar active states.
5. **🪟 Advanced Glassmorphism**: Tailored GlassCards featuring border glows, scale springs on hover, and smooth depth configurations.
6. **📈 Animated Numerical Stats**: Numerical counters in the About and Competitive Programming sections that count up from 0 to their target numbers when scrolled into view.
7. **⏱️ Professional Timeline**: Alternating vertical timelines showcasing professional highlights, accomplishments, and skills.
8. **💼 Detailed Project Modals**: Complete portfolio expansion drawers displaying comprehensive system architectures, feature lists, and technologies, supporting ESC key and outside-click cleanup.
9. **📧 Interactive Contact Panel**: Client-side contact validation with full loading indicators, success banners, and quick links.

---

## 📂 Project Directory Structure

```text
portfolio/
├── public/                 # Static assets (PDF resume, favicons)
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styling, Tailwind imports, glassmorphism, noise overlays
│   │   ├── layout.tsx      # App wrapper, Google fonts (Inter, Mono), SEO metadata
│   │   └── page.tsx        # Main routing page, LoadingScreen wrapper, section assembler
│   ├── components/
│   │   ├── layout/         # Sticky Glass Navbar, Footer, ScrollProgress, CustomCursor
│   │   ├── sections/       # Hero, About, Skills, Experience, Projects, Certifications, Contact
│   │   ├── three/          # HeroScene, ParticleField, FloatingIcons 3D modules
│   │   └── ui/             # Reusable animated elements (GlassCard, TimelineItem, SkillBar, etc.)
│   ├── data/
│   │   ├── navigation.ts   # Navbar and footer social configurations
│   │   └── resume.ts       # Central source of truth for Ajay's career, education, and skills
│   ├── hooks/
│   │   ├── useScrollSpy.ts # Detects active viewport section
│   │   ├── useMediaQuery.ts# SSR-safe CSS media query tracker
│   │   └── useReducedMotion.ts # Detects accessibility reduced-motion settings
│   └── lib/
│       └── utils.ts        # Helper tailwind-merge and classnames join utilities
├── package.json            # Dependencies and scripts
└── tsconfig.json           # Compiler configurations
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have [Node.js (v18.x or later)](https://nodejs.org/) installed on your machine.

### 📥 Installation

1. Clone or download this repository.
2. Open your terminal in the `portfolio/` project root directory:

```bash
npm install
```

### 💻 Running Development Server

To start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will hot-reload as you make changes.

### 🏗️ Creating Production Build

To test and compile a highly optimized production bundle:

```bash
npm run build
```

Once built, you can run the production server locally with:

```bash
npm run start
```

---

## 🔒 Optimization & Accessiblity (A11y)

- **Performance**: Heavy 3D Canvas scenes are loaded **lazily** on the client side using Next.js `dynamic()` imports with `ssr: false`, maximizing initial page load speeds and lighthouse scores.
- **Accessibility**: Smooth transitions obey the operating system's `prefers-reduced-motion` settings via a custom hook (`useReducedMotion`), providing static fallbacks for affected users.
- **SEO**: Complete metadata tags, responsive viewports, custom meta descriptions, and Google Font optimizations are structured directly inside the root `layout.tsx`.
