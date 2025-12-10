"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { overviewData } from "@/constants/overview-section";
import { ImagePopover } from "./image-popover";

export function OverviewSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="about" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              {overviewData.header.title}{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {overviewData.header.highlightedWord}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {overviewData.header.subtitle}
            </p>
          </div>

          <div
            className={`mb-16 transition-all duration-500 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative h-96 w-[80%] mx-auto rounded-lg overflow-hidden border border-border bg-background/50 group hover:border-primary/50 transition-all duration-300">
                  <Image
                    src={overviewData.mainSection.image}
                    alt={overviewData.mainSection.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-foreground">
                      {overviewData.mainSection.title}
                    </h3>
                    <p className="text-base font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {overviewData.mainSection.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {overviewData.mainSection.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {overviewData.achievements.map((achievement, achievementIndex) => (
              <div
                key={achievementIndex}
                className={`transition-all duration-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: achievement.transitionDelay }}
              >
                <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-8 h-full">
                  <div className="space-y-6">
                    {/* Image with Popover */}
                    <ImagePopover
                      mainImage={achievement.image}
                      mainImageAlt={achievement.imageAlt}
                      popoverImage={achievement.popoverImage}
                      popoverImageAlt={`${achievement.title} Details`}
                      link={achievement.link}
                    />

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-foreground">
                          {achievement.title}
                        </h3>
                        <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {achievement.subtitle}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
