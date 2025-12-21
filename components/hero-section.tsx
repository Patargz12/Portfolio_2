"use client";

import { useState, useEffect } from "react";
import { Trophy, Code } from "lucide-react";
import { FloatingCard } from "./floating-card";
import { AnimatedBackground } from "./animated-background";
import { CodeDisplay } from "./code-display";
import { heroData } from "@/constants/hero-section";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center w-full">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-8 transition-all duration-1000 text-center lg:text-left ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-primary/30  text-foreground text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {heroData.badge.text}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                <span className="text-white">
                  {heroData.heading.text}{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    {heroData.heading.highlighted}
                  </span>
                </span>
              </h1>

              <p className="text-lg  max-w-xl leading-relaxed">
                {heroData.description.text}
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              {heroData.achievements.map((achievement, index) => {
                const Icon = index === 0 ? Trophy : Code;
                return (
                  <div
                    key={index}
                    className={`w-full sm:w-auto px-6 py-4 rounded-lg bg-gradient-to-r ${
                      achievement.colorScheme === "primary"
                        ? "from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50"
                        : "from-accent/10 to-secondary/10 border-accent/30 hover:border-accent/50"
                    } border transition-colors`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm font-semibold text-white">
                        {achievement.title}
                      </p>
                    </div>
                    <p className="text-xs mt-1 text-left">
                      {achievement.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div
            className={`relative h-38 md:h-96 lg:h-full transition-all duration-1000 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Floating Cards - Hidden on mobile */}
            <div className="hidden md:block absolute inset-0 space-y-4">
              {heroData.floatingCards.map((card, index) => (
                <FloatingCard
                  key={index}
                  delay={card.delay}
                  className={`absolute ${card.position.className} max-w-xs`}
                >
                  <div className="space-y-2">
                    <p
                      className={`text-xs font-semibold text-${card.colorScheme}`}
                    >
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
  );
}
