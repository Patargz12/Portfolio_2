"use client"

import { Timeline } from "@/components/ui/timeline"
import { experienceData } from "@/constants/experience-section"

export function WorkExperienceTimeline() {
  const timelineData = experienceData.experiences.map((experience) => ({
    title: experience.title,
    content: (
      <div>
        <p className="text-white font-semibold text-lg mb-2">{experience.company}</p>
        <p className="text-sm mb-4">{experience.period}</p>
        <ul className="space-y-2">
          {experience.responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-accent flex-shrink-0">•</span>
              <span className=" text-sm">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }))

  return (
    <section id="work">
      <Timeline data={timelineData} />
    </section>
  )
}
