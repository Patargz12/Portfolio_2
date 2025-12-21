"use client";

import { useState } from "react";
import { techStackData } from "@/constants/tech-section";

interface TechCardProps {
  category: (typeof techStackData.categories)[0];
  index: number;
}

export function TechStackSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredAdditionalIndex, setHoveredAdditionalIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            {techStackData.header.title}{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {techStackData.header.highlightedWord}
            </span>
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            {techStackData.header.subtitle}
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackData.categories.map((category, index: number) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card Background with Gradient */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              />

              {/* Card Content */}
              <div className="relative h-full p-6 rounded-xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm group-hover:bg-neutral-900/80 transition-all duration-300 group-hover:border-neutral-600">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                      {category.title}
                    </h3>
                  </div>
                  {hoveredIndex === index && (
                    <div className="animate-pulse">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  )}
                </div>

                {/* Subtitle */}
                <p className="text-sm text-neutral-400 mb-4">
                  {category.subtitle}
                </p>

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map(
                    (tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          hoveredIndex === index
                            ? "bg-neutral-700/50 text-cyan-300 border border-cyan-500/30"
                            : "bg-neutral-800/50 text-neutral-300 border border-neutral-700/30"
                        }`}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* Hover indicator line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 ${
                    hoveredIndex === index
                      ? `w-full bg-gradient-to-r ${category.color}`
                      : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tech Categories Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStackData.additionalCategories.map((category, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredAdditionalIndex(index)}
              onMouseLeave={() => setHoveredAdditionalIndex(null)}
              className="group relative cursor-pointer"
            >
              {/* Card Background with Gradient */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              />

              {/* Card Content */}
              <div className="relative h-full p-6 rounded-xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm group-hover:bg-neutral-900/80 transition-all duration-300 group-hover:border-neutral-600">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                      {category.title}
                    </h3>
                  </div>
                  {hoveredAdditionalIndex === index && (
                    <div className="animate-pulse">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  )}
                </div>

                {/* Subtitle */}
                <p className="text-sm text-neutral-400 mb-4">
                  {category.subtitle}
                </p>

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map(
                    (tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          hoveredAdditionalIndex === index
                            ? "bg-neutral-700/50 text-cyan-300 border border-cyan-500/30"
                            : "bg-neutral-800/50 text-neutral-300 border border-neutral-700/30"
                        }`}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* Hover indicator line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 ${
                    hoveredAdditionalIndex === index
                      ? `w-full bg-gradient-to-r ${category.color}`
                      : "w-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
