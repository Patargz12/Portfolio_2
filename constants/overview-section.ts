import {
    softwareEngineerPlaceholder,
} from "@/public"

export const overviewData = {
    header: {
        title: "About",
        highlightedWord: "Me",
        subtitle: "A passionate developer with a strong foundation in full-stack development and competitive programming.",
    },
    mainSection: {
        image: "/about/profile_img.jpg",
        imageAlt: "Patrick Arganza",
        title: "Software Engineer",
        subtitle: "JavaScript & Full-Stack Specialist",
        description:
            "Proficient in modern JavaScript frameworks and libraries including React, Node.js, and Express. Experienced in building scalable full-stack applications with clean, maintainable code and best practices.",
    },
    achievements: [
        {
            image: "/about/leetcode_rank.jpg",
            imageAlt: "LeetCode Rank",
            popoverImage: "/about/leetcode_popover.jpg",
            title: "LeetCode Rank",
            subtitle: "Top 5% in Leetcode",
            description:
                "Achieved a competitive ranking in the top 0.6% of LeetCode users through consistent problem-solving. Demonstrated strong algorithmic thinking, data structure expertise, and dedication to continuous improvement.",
            transitionDelay: "150ms",
        },
        {
            image: "/about/hackathon_winner.jpg",
            imageAlt: "Hackathon Winner",
            popoverImage: "/about/hackathon_popover.jpg",
            title: "Hackathon Winner",
            subtitle: "Level 1 Hackathon Winner",
            description:
                "Built an innovative full-stack solution under time constraints. Showcased rapid prototyping skills, teamwork, technical execution, and the ability to deliver a polished product in a competitive environment.",
            transitionDelay: "300ms",
        },
    ],
}

export type OverviewData = typeof overviewData
