import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajay Keelu | Software Engineer & .NET Developer",
  description:
    "Portfolio of Ajay Keelu — Results-driven .NET Developer with 2+ years of experience building scalable enterprise applications with C#, ASP.NET Core, Azure, and React. Explore my projects, skills, and professional journey.",
  keywords: [
    ".NET Developer",
    "Software Engineer",
    "C#",
    "ASP.NET Core",
    "Azure",
    "React",
    "Angular",
    "Full-Stack Developer",
    "Web Developer",
    "Ajay Keelu",
  ],
  authors: [{ name: "Ajay Keelu" }],
  creator: "Ajay Keelu",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ajay Keelu | Software Developer",
    description:
      "Results-driven .NET Developer building scalable enterprise applications with modern technologies.",
    siteName: "Ajay Keelu Portfolio",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Ajay Keelu | Software Engineer & .NET Developer",
  //   description:
  //     "Results-driven .NET Developer building scalable enterprise applications with modern technologies.",
  // },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo-ak-alt.png",
    apple: "/logo-ak-alt.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#0a0a1a] text-white font-[var(--font-inter)] antialiased overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
