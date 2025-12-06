export const heroData = {
    badge: {
        text: "Open for Projects",
    },
    heading: {
        text: "Hi, I'm",
        highlighted: "Patrick",
    },
    description: {
        text: "Crafting full-stack web applications with the MERN stack. I specialize in building scalable, performant, and user-centric solutions that solve real-world problems.",
    },
    achievements: [
        {
            title: "Level 1 - Hackathon Winner",
            subtitle: "Recognized for innovation and execution",
            colorScheme: "primary", // from-primary/10 to-accent/10
        },
        {
            title: "Top 5% in Leetcode",
            subtitle: "Out of 5,000,000+ users",
            colorScheme: "accent", // from-accent/10 to-secondary/10
        },
    ],
    techStack: {
        label: "Tech Stack",
        technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js"],
    },
    socialLinks: [
        {
            platform: "Instagram",
            url: "https://www.instagram.com/pat_argz/",
            icon: "Instagram",
        },
        {
            platform: "GitHub",
            url: "https://github.com/Patargz12",
            icon: "Github",
        },
        {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/patrick-arganza-816331173/",
            icon: "Linkedin",
        },
    ],
    floatingCards: [
        {
            title: "MERN Stack",
            description: "Full-stack web development",
            colorScheme: "primary",
            position: {
                className: "top-[-24px] right-0",
            },
            delay: 0,
        },
        {
            title: "API Development",
            description: "RESTful & Express",
            colorScheme: "accent",
            position: {
                className: "top-[-24px] left-0",
            },
            delay: 0.2,
        },
        {
            title: "Database Design",
            description: "MongoDB, Supabase",
            colorScheme: "secondary",
            position: {
                className: "bottom-[-14px] right-12",
            },
            delay: 0.4,
        },
    ],
}

export type HeroData = typeof heroData
