export interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    category: string
    link?: string
    github?: string
}

export const projectsData = {
    header: {
        title: "Featured",
        highlightedWord: "Projects",
        subtitle: "Explore my latest work and creative solutions",
    },
    categories: ["All", "Web App", "Mobile App", "AI/ML", "SaaS", "Dashboard", "Web3"],
    projectsPerPage: 6,
    projects: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description:
                "A full-stack e-commerce solution with real-time inventory management, payment processing, and advanced analytics dashboard.",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
            tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
            category: "Web App",
            link: "#",
            github: "#",
        },
        {
            id: 2,
            title: "AI Content Generator",
            description:
                "Machine learning powered content creation tool that generates marketing copy, blog posts, and social media content.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            tags: ["Python", "TensorFlow", "FastAPI", "React"],
            category: "AI/ML",
            link: "#",
            github: "#",
        },
        {
            id: 3,
            title: "Real-Time Collaboration Tool",
            description:
                "WebSocket-based collaborative workspace with live editing, video calls, and project management features.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
            tags: ["TypeScript", "WebRTC", "Socket.io", "MongoDB"],
            category: "SaaS",
            link: "#",
            github: "#",
        },
        {
            id: 4,
            title: "Mobile Fitness Tracker",
            description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features.",
            image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
            tags: ["React Native", "Firebase", "Redux", "HealthKit"],
            category: "Mobile App",
            link: "#",
            github: "#",
        },
        {
            id: 5,
            title: "Analytics Dashboard",
            description: "Real-time data visualization platform with customizable widgets, reports, and predictive analytics.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            tags: ["Vue.js", "D3.js", "GraphQL", "Redis"],
            category: "Dashboard",
            link: "#",
            github: "#",
        },
        {
            id: 6,
            title: "Blockchain Explorer",
            description:
                "Decentralized application for exploring blockchain transactions, smart contracts, and wallet analytics.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
            tags: ["Web3.js", "Solidity", "React", "Ethers.js"],
            category: "Web3",
            link: "#",
            github: "#",
        },
        {
            id: 7,
            title: "Video Streaming Platform",
            description: "Netflix-style streaming service with adaptive bitrate, CDN integration, and recommendation engine.",
            image: "https://images.unsplash.com/photo-1574267432644-f76d7f93dd7e?w=800&q=80",
            tags: ["Next.js", "AWS", "FFmpeg", "ElasticSearch"],
            category: "Web App",
            link: "#",
            github: "#",
        },
        {
            id: 8,
            title: "Task Management System",
            description: "Kanban-style project management tool with automation, integrations, and team collaboration features.",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
            tags: ["Angular", "NestJS", "PostgreSQL", "Docker"],
            category: "SaaS",
            link: "#",
            github: "#",
        },
        {
            id: 9,
            title: "Social Media Platform",
            description: "Full-featured social network with posts, stories, messaging, and content recommendation algorithms.",
            image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
            tags: ["React", "Django", "Kafka", "Cassandra"],
            category: "Web App",
            link: "#",
            github: "#",
        },
    ] as Project[],
}

export type ProjectsData = typeof projectsData
