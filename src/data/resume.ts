// ─────────────────────────────────────────────────────────────
// Resume Data — Ajay Keelu's Portfolio
// ─────────────────────────────────────────────────────────────

/* ── Type Definitions ─────────────────────────────────────── */

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  location: string;
}

export interface Skill {
  name: string;
  icon: string;
  proficiency?: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  period: string;
  category: string;
  github?: string;
  liveDemo?: string;
  image: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  logo?: string;
}

export interface CodingStats {
  icon: string;
  platform: string;
  count: string;
  label: string;
  profileLink: string;
}

/* ── Personal Info ────────────────────────────────────────── */

export const personalInfo: PersonalInfo = {
  name: 'Ajay Keelu',
  title: 'Software Engineer & .NET Developer',
  tagline: 'Building Scalable Enterprise Solutions',
  email: 'ajaykeelu1729@gmail.com',
  github: 'https://github.com/ajay-keelu',
  linkedin: 'https://linkedin.com/in/ajay-keelu',
  location: 'India',
  summary:
    'Results-driven Software Engineer with expertise in designing, developing, and deploying scalable enterprise applications using the .NET ecosystem and modern web technologies. Proven track record of building high-performance HRMS modules, optimizing backend architectures, and delivering seamless full-stack solutions. Passionate about clean code, cloud-native development, and solving complex problems — with 330+ LeetCode and 250+ GeeksforGeeks challenges conquered.',
};

/* ── Typewriter Strings ───────────────────────────────────── */

export const typewriterStrings: string[] = [
  'Software Developer',
  '.NET Developer',
  'Full-Stack Developer',
  'Problem Solver',
  'Azure Enthusiast',
];

/* ── Stats ─────────────────────────────────────────────────── */

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 330, suffix: '+', label: 'LeetCode Problems' },
  { value: 250, suffix: '+', label: 'GFG Problems' },
  { value: 5, suffix: '+', label: 'Certifications' },
];

/* ── Skills ────────────────────────────────────────────────── */

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'SiCsharp',
    skills: [
      { name: 'C#', icon: 'SiCsharp' },
      { name: 'Java', icon: 'SiOpenjdk' },
      { name: 'Python', icon: 'SiPython' },
      { name: 'JavaScript', icon: 'SiJavascript' },
      { name: 'TypeScript', icon: 'SiTypescript' },
      { name: 'SQL', icon: 'SiMicrosoftsqlserver' },
    ],
  },
  {
    title: 'Backend',
    icon: 'SiDotnet',
    skills: [
      { name: '.NET Core', icon: 'SiDotnet' },
      { name: 'ASP.NET MVC', icon: 'SiDotnet' },
      { name: 'Web API', icon: 'SiDotnet' },
      { name: 'Entity Framework', icon: 'SiDotnet' },
      { name: 'LINQ', icon: 'SiDotnet' },
      { name: 'Node.js', icon: 'SiNodedotjs' },
    ],
  },
  {
    title: 'Frontend',
    icon: 'SiReact',
    skills: [
      { name: 'React', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'Angular', icon: 'SiAngular' },
      { name: 'HTML5', icon: 'SiHtml5' },
      { name: 'CSS3', icon: 'SiCss3' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
    ],
  },
  {
    title: 'Databases',
    icon: 'SiMicrosoftsqlserver',
    skills: [
      { name: 'SQL Server', icon: 'SiMicrosoftsqlserver' },
      { name: 'MongoDB', icon: 'SiMongodb' },
      { name: 'Redis', icon: 'SiRedis' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'SiMicrosoftazure',
    skills: [
      { name: 'Azure', icon: 'SiMicrosoftazure' },
      { name: 'Azure DevOps', icon: 'SiAzuredevops' },
      { name: 'Git', icon: 'SiGit' },
    ],
  },
  {
    title: 'Tools',
    icon: 'SiVisualstudio',
    skills: [
      { name: 'Visual Studio', icon: 'SiVisualstudio' },
      { name: 'VS Code', icon: 'SiVisualstudiocode' },
      { name: 'Postman', icon: 'SiPostman' },
      { name: 'Swagger', icon: 'SiSwagger' },
    ],
  },
  {
    title: 'Architecture & Concepts',
    icon: 'SiDiagramsdotnet',
    skills: [
      { name: 'REST APIs', icon: 'SiOpenapiinitiative' },
      { name: 'Microservices', icon: 'SiDiagramsdotnet' },
      { name: 'Design Patterns', icon: 'SiDiagramsdotnet' },
      { name: 'SOLID Principles', icon: 'SiDiagramsdotnet' },
      { name: 'Agile / Scrum', icon: 'SiJirasoftware' },
    ],
  },
];

/* ── Experience ────────────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Developer',
    company: 'Tezo Digital Solution LLP',
    location: 'India',
    period: 'Jan 2024 — Present',
    startDate: '2024-01',
    endDate: 'Present',
    description:
      'Contributing to the development of Keka HR — a leading cloud-based HRMS platform — designing and implementing enterprise-grade modules that serve thousands of organisations and millions of users.',
    achievements: [
      'Architected and developed the Hiro Module (Advanced HRMS) end-to-end, delivering scalable payroll, attendance, and employee management features using ASP.NET Core Web API and Angular',
      'Engineered RESTful APIs with optimised SQL Server queries and Entity Framework Core, reducing average API response times by 40% across critical endpoints',
      'Implemented robust authentication and role-based access control (RBAC) ensuring enterprise-grade security compliance',
      'Built the Keka Client Demo System — an automated demo environment provisioning tool — cutting client onboarding time by 60%',
      'Developed reusable Angular component libraries and shared services, accelerating feature delivery across multiple product teams',
      'Collaborated in Agile/Scrum ceremonies, consistently delivering sprint commitments with 95%+ on-time completion rate',
      'Conducted thorough code reviews and established coding standards, improving team code quality metrics by 30%',
      'Integrated Azure DevOps CI/CD pipelines for automated builds, testing, and zero-downtime deployments',
    ],
    technologies: [
      'C#',
      '.NET Core',
      'ASP.NET MVC',
      'Web API',
      'Angular',
      'TypeScript',
      'SQL Server',
      'Entity Framework',
      'Azure',
      'Azure DevOps',
      'Git',
      'Redis'
    ],
  },
];

/* ── Projects ──────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: 1,
    title: 'Hiro Module',
    subtitle: 'Keka HRMS — Advanced HR Management',
    description:
      'A comprehensive HRMS module powering payroll processing, attendance tracking, leave management, and employee lifecycle operations for enterprise clients.',
    longDescription:
      'Hiro is a flagship module within the Keka HR platform, designed to handle the complete employee management lifecycle at scale. Built with a microservices-inspired architecture on .NET Core, the module serves thousands of organisations and processes millions of payroll transactions monthly. The frontend leverages Angular with lazy-loaded modules for optimal performance, while the backend utilises Entity Framework Core with optimised stored procedures for complex payroll calculations.',
    technologies: [
      'C#',
      '.NET Core',
      'ASP.NET Web API',
      'Angular',
      'TypeScript',
      'SQL Server',
      'Entity Framework Core',
      'Azure',
      'Redis',
    ],
    features: [
      'End-to-end payroll processing with tax compliance',
      'Real-time attendance tracking and shift management',
      'Configurable leave policies and approval workflows',
      'Employee onboarding and offboarding automation',
      'Role-based dashboards with analytics and reporting',
      'Multi-tenant architecture supporting 1000+ organisations',
    ],
    period: 'Jan 2024 — Present',
    category: 'Enterprise',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'Demo Project',
    subtitle: 'Keka HRMS — Advanced HR Management',
    description:
      'An automated demo environment provisioning system that enables sales and customer success teams to spin up fully configured Keka instances for client demonstrations.',
    longDescription:
      'The Keka Client Demo System automates the entire lifecycle of demo environment management — from provisioning isolated tenant instances with pre-populated sample data to automatic cleanup after demo periods. Built on ASP.NET Core with background job processing, the system reduced client onboarding time by 60% and eliminated manual setup overhead for the sales team. The solution integrates with Azure infrastructure for dynamic resource allocation and scaling.',
    technologies: [
      'C#',
      '.NET Core',
      'SQL Server',
      'Azure DevOps'
    ],
    features: [
      'One-click demo environment provisioning',
      'Pre-populated sample data with realistic scenarios',
      'Automated tenant isolation and data security',
      'Scheduled cleanup and resource reclamation',
      'Admin dashboard for monitoring active demos',
      'Integration with CRM for lead tracking',
    ],
    period: '2024',
    category: 'Internal Tooling',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
];

/* ── Certifications ────────────────────────────────────────── */

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'Oracle Certified — Java Foundations',
    issuer: 'Oracle',
    icon: 'SiOracle',
  },
  {
    id: 2,
    title: 'IT Specialist — JavaScript',
    issuer: 'Certiport (Pearson VUE)',
    icon: 'SiJavascript',
  },
  {
    id: 3,
    title: 'Java (Basic) Certification',
    issuer: 'HackerRank',
    icon: 'SiHackerrank',
  },
  {
    id: 4,
    title: 'Python (Basic) Certification',
    issuer: 'HackerRank',
    icon: 'SiHackerrank',
  },
  {
    id: 5,
    title: 'Problem Solving (Basic) Certification',
    issuer: 'HackerRank',
    icon: 'SiHackerrank',
  },
];

/* ── Education ─────────────────────────────────────────────── */

export const education: Education = {
  degree: 'Bachelor of Technology — Computer Science & Engineering',
  institution: 'Aditya Engineering College',
  location: 'Andhra Pradesh, India',
  period: '2020 — 2024',
  description:
    'Completed a four-year undergraduate program in Computer Science & Engineering, building a strong foundation in data structures, algorithms, operating systems, database management, and software engineering principles. Actively participated in competitive programming and hackathons.',
};

/* ── Coding Stats ──────────────────────────────────────────── */

export const codingStats: CodingStats[] = [
  { platform: 'LeetCode', count: '330+', label: 'Problems Solved', icon: 'SiLeetcode', profileLink: 'https://leetcode.com/u/ajay_keelu/' },
  { platform: 'GeeksforGeeks', count: '250+', label: 'Problems Solved', icon: 'SiGeeksforgeeks', profileLink: 'https://www.geeksforgeeks.org/profile/__ajaykeelu' },
  { platform: 'CodeChef', count: '100+', label: 'Problems Solved', icon: 'SiCodechef', profileLink: 'https://www.codechef.com/users/ajay_keelu' },
  { platform: 'HackerRank', count: '100+', label: 'Problems Solved', icon: 'SiHackerrank', profileLink: 'https://www.hackerrank.com/profile/____ajay____' },
];
