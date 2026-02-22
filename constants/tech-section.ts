export const techStackData = {
    header: {
        title: "Tech",
        highlightedWord: "Stack",
        subtitle: "A comprehensive collection of technologies and tools I use to build innovative solutions",
    },
    categories: [
        {
            title: "Frontend Development",
            subtitle: "Building responsive and interactive user interfaces",
            technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "ReactJS", "NextJS", "NuxtJS", "TailwindCSS"],
            color: "from-blue-500 to-cyan-500",
            icon: "🎨",
        },
        {
            title: "Backend Development",
            subtitle: "Server-side applications and API development",
            technologies: ["PHP", "Python", "Node.js", "Laravel", "Express.js", "RESTful API", "GraphQL"],
            color: "from-purple-500 to-pink-500",
            icon: "⚙️",
        },
        {
            title: "Mobile & Cross-platform",
            subtitle: "Native and cross-platform mobile applications",
            technologies: ["React Native", "Flutter", "Ionic"],
            color: "from-green-500 to-emerald-500",
            icon: "📱",
        },
        {
            title: "Databases",
            subtitle: "Data storage and management solutions",
            technologies: ["MySQL", "MongoDB", "NoSQL", "Supabase"],
            color: "from-orange-500 to-red-500",
            icon: "🗄️",
        },
        {
            title: "Developer Tools & DevOps",
            subtitle: "Development workflow and deployment",
            technologies: ["Git", "VS Code", "Postman", "Figma", "MCP Servers", "Webpack", "Vercel", "Docker"],
            color: "from-indigo-500 to-blue-500",
            icon: "🛠️",
        },
        {
            title: "AI & Machine Learning",
            subtitle: "Artificial Intelligence and advanced algorithms",
            technologies: ["TensorFlow", "OpenCV", "CNN Algorithm", "Neural Networks", "Tesseract", "Vector Search"],
            color: "from-violet-500 to-purple-500",
            icon: "🤖",
        },
    ],
    additionalCategories: [
        {
            title: "Core Computer Science",
            subtitle: "Fundamental concepts and principles",
            technologies: ["OOP", "MVC", "Data Structures", "Microservices", "Workflow", "Ubuntu", "Agile", "Scrum"],
            color: "from-sky-500 to-blue-600",
            icon: "💻",
        },
        {
            title: "No-Code & Visual Development",
            subtitle: "Visual development and content management",
            technologies: ["WordPress", "Webflow", "Elementor", "Beaver Builder", "Colibri", "Wix"],
            color: "from-pink-500 to-rose-500",
            icon: "🧩",
        },
    ],
}

export type TechStackData = typeof techStackData
