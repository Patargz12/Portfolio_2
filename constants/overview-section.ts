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
        title: "Patrick Arganza",
        subtitle: "Full-Stack Software Engineer",
        description:
            "Proficient in React, Node.js, and Express with hands-on experience building RAG systems, vector databases, and LLM integrations. Skilled in implementing secure payment processing with Stripe and deploying scalable, AI-enhanced applications. <br /><br /> Lately, I've been diving deep into AI automation—building and deploying autonomous agents that handle complex workflows end-to-end. Orchestrating multi-model systems with Claude, Gemini, and specialized LLMs to create agents that reason, plan, and execute tasks. From engineering RAG pipelines with semantic search to designing agentic systems with tool-calling capabilities and persistent memory, I'm exploring how intelligent agents can transform traditional applications into adaptive, self-improving platforms.",
    },
    achievements: [
        {
            image: "/about/leetcode_rank.jpg",
            imageAlt: "LeetCode Rank",
            popoverImage: "/about/leetcode_popover.jpg",
            title: "LeetCode Rank",
            subtitle: "Top 1% in Leetcode",
            description:
                "Achieved a competitive ranking in the top 5% of LeetCode users through consistent problem-solving. Demonstrated strong algorithmic thinking, data structure expertise, and dedication to continuous improvement.",
            transitionDelay: "150ms",
            link: "https://leetcode.com/u/vt3Yo4HDkF/",
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
            link: "https://devpost.com/arganzapatrick/achievements",
        },
    ],
}

export type OverviewData = typeof overviewData
