"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail } from 'lucide-react'
import { FloatingCard } from "./floating-card"
import { AnimatedBackground } from "./animated-background"
import { CodeDisplay } from "./code-display"
import { heroData } from "@/constants/hero-section"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Map icon names to components
  const iconMap = {
    Github,
    Linkedin,
    Mail,
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  {heroData.badge.text}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {heroData.heading.text}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                {heroData.description.text}
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {heroData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 rounded-lg bg-gradient-to-r ${achievement.colorScheme === 'primary'
                      ? 'from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50'
                      : 'from-accent/10 to-secondary/10 border-accent/30 hover:border-accent/50'
                    } border transition-colors`}
                >
                  <p className={`text-sm font-semibold text-${achievement.colorScheme}`}>
                    {achievement.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="pt-8 space-y-4">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {heroData.techStack.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {heroData.techStack.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors text-sm font-medium text-foreground"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {heroData.socialLinks.map((social, index) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap]
                return (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.platform}
                    className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div
            className={`relative h-96 lg:h-full transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="absolute inset-0 space-y-4">
              {heroData.floatingCards.map((card, index) => (
                <FloatingCard
                  key={index}
                  delay={card.delay}
                  className={`absolute ${card.position.className} max-w-xs`}
                >
                  <div className="space-y-2">
                    <p className={`text-xs font-semibold text-${card.colorScheme}`}>
                      {card.title}
                    </p>
                    <p className="text-sm text-foreground">
                      {card.description}
                    </p>
                  </div>
                </FloatingCard>
              ))}
            </div>

            {/* Code Display */}
            <div className="absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
              <CodeDisplay />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
