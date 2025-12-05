import {
    hackathonBadgePlaceholder,
    hackathonBadgePlaceholder2,
    leetcodeBadgePlaceholder,
    leetcodeBadgePlaceholder2,
    softwareEngineerPlaceholder,
} from "@/public"

export const overviewData = {
    header: {
        title: "About",
        highlightedWord: "Me",
        subtitle: "A passionate developer with a strong foundation in full-stack development and competitive programming.",
    },
    mainSection: {
        image: softwareEngineerPlaceholder,
        imageAlt: "Software Engineer",
        title: "Software Engineer",
        subtitle: "JavaScript & Full-Stack Specialist",
        description:
            "Proficient in modern JavaScript frameworks and libraries including React, Node.js, and Express. Experienced in building scalable full-stack applications with clean, maintainable code and best practices.",
    },
    achievements: [
        {
            images: [
                {
                    src: leetcodeBadgePlaceholder,
                    alt: "LeetCode Badge 1",
                },
                {
                    src: leetcodeBadgePlaceholder2,
                    alt: "LeetCode Badge 2",
                },
            ],
            title: "LeetCode Rank",
            subtitle: "Top 30,000 out of 5,000,000+ users",
            description:
                "Achieved a competitive ranking in the top 0.6% of LeetCode users through consistent problem-solving. Demonstrated strong algorithmic thinking, data structure expertise, and dedication to continuous improvement.",
            transitionDelay: "150ms",
        },
        {
            images: [
                {
                    src: hackathonBadgePlaceholder,
                    alt: "Hackathon Badge 1",
                },
                {
                    src: hackathonBadgePlaceholder2,
                    alt: "Hackathon Badge 2",
                },
            ],
            title: "Hackathon Winner",
            subtitle: "Level 1 Hackathon Champion",
            description:
                "Built an innovative full-stack solution under time constraints. Showcased rapid prototyping skills, teamwork, technical execution, and the ability to deliver a polished product in a competitive environment.",
            transitionDelay: "300ms",
        },
    ],
}

export type OverviewData = typeof overviewData
