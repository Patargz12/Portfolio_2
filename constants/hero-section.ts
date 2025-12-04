export const heroData = {
    badge: {
        text: "Full-Stack Developer",
    },
    heading: {
        text: "Hi, I'm Patrick Arganza",
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
            title: "Rank 30,000 in LeetCode",
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
            platform: "GitHub",
            url: "#",
            icon: "Github",
        },
        {
            platform: "LinkedIn",
            url: "#",
            icon: "Linkedin",
        },
        {
            platform: "Email",
            url: "#",
            icon: "Mail",
        },
    ],
    floatingCards: [
        {
            title: "MERN Stack",
            description: "Full-stack web development",
            colorScheme: "primary",
            position: {
                className: "top-0 right-0",
            },
            delay: 0,
        },
        {
            title: "API Development",
            description: "RESTful & GraphQL APIs",
            colorScheme: "accent",
            position: {
                className: "top-32 left-0",
            },
            delay: 0.2,
        },
        {
            title: "Database Design",
            description: "MongoDB, PostgreSQL",
            colorScheme: "secondary",
            position: {
                className: "bottom-0 right-12",
            },
            delay: 0.4,
        },
    ],
}

export type HeroData = typeof heroData
