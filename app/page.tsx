"use client";

import { HeroSection } from "@/components/hero-section";
import { OverviewSection } from "@/components/overview-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { WorkExperienceTimeline } from "@/components/work-experience-timeline";
import { Projects } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AnimatedBackground />
      <HeroSection />
      <OverviewSection />
      <TechStackSection />
      <WorkExperienceTimeline />
      <Projects />
      <ContactSection />
    </main>
  );
}
