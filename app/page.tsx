"use client";

import { HeroSection } from "@/components/hero-section";
import { OverviewSection } from "@/components/overview-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { WorkExperienceTimeline } from "@/components/work-experience-timeline";
import { Projects } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { AnimatedBackground } from "@/components/animated-background";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { 
  IconUser, 
  IconCode, 
  IconBriefcase, 
  IconFolders, 
  IconMail 
} from "@tabler/icons-react";

export default function Home() {
  const navItems = [
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Work",
      link: "#work",
      icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconFolders className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <IconMail className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <AnimatedBackground />
      <FloatingNav navItems={navItems} />
      <HeroSection />
      <OverviewSection />
      <TechStackSection />
      <WorkExperienceTimeline />
      <Projects />
      <ContactSection />
    </main>
  );
}
