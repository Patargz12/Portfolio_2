export interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    categories: string[]
    link?: string | null
    github?: string | null
}

export const projectsData = {
    header: {
        title: "Featured",
        highlightedWord: "Projects",
        subtitle: "Explore my latest work and creative solutions",
    },
    categories: ["All", "Web App", "Mobile App", "AI/ML", "SaaS", "NFT"],
    projectsPerPage: 6,
    projects: [
        {
            id: 1,
            title: "Netflix Clone",
            description:
                "A personal project replicating Netflix's core functionalities, developed using Netflix's design system to practice Zustand and TanStack Query.",
            image: "/projects/Netflix_Clone.jpg",
            tags: ["ReactJS", "RESTfulAPI", "Zustand"],
            categories: ["Web App"],
            github: "https://netflix-clone-arganza.vercel.app/",
            link: "https://netflix-clone-arganza.vercel.app/",
        },
        {
            id: 2,
            title: "Pokemon Game",
            description:
                "A basic game in which the user must guess which Pokemon is on their screen. It is also my first NextJs project.",
            image: "/projects/pokemon.png",
            tags: ["Nextjs", "Api", "Git"],
            categories: ["Web App"],
            github: "https://pokemon-deploy-dnvh4u6rc-patargz12.vercel.app/",
            link: "https://pokemon-deploy-dnvh4u6rc-patargz12.vercel.app/",
        },
        {
            id: 3,
            title: "Pulp Dental Clinic",
            description:
                "I developed a landing page for a dental clinic using ReactJS, utilizing five front-end libraries for bettter UI / UX.",
            image: "/projects/Pulp_Clinic.jpg",
            tags: ["ReactJS", "Javascript", "Tailwind"],
            categories: ["Web App"],
            github: "https://pulp-clinic.vercel.app/",
            link: "https://pulp-clinic.vercel.app/",
        },
        {
            id: 4,
            title: "RoadSpeak",
            description:
                "My capstone, which has an object detection feature, it introduces me to mobile development and text-to-speech technology.",
            image: "/projects/roadspeak.png",
            tags: ["Flutter", "Tensorflow", "Yolov8", "CNN"],
            categories: ["Mobile App", "AI/ML"],
            github: "https://roadspeak.vercel.app/",
            link: "https://roadspeak.vercel.app/",
        },
        {
            id: 5,
            title: "iXhibit",
            description:
                "A small social media platform for artist which has messaging features and advance SCRUD operations which I created for a school activity.",
            image: "/projects/ixhibit.png",
            tags: ["C#", "mongodb"],
            categories: ["SaaS"],
            github: "https://github.com/Patargz12/iXhibit",
            link: null,
        },
        {
            id: 6,
            title: "Crypto Tracker",
            description:
                "A web application I built that displays real-time crypto exchange rates using the CoinGecko API and features MetaMask wallet authentication to show Ethereum balances.",
            image: "/projects/crypto_tracker.png",
            tags: ["NuxtJS", "Ethers", "Web3"],
            categories: ["NFT", "Web App"],
            github: "https://crypto-app-arganza.vercel.app/",
            link: "https://crypto-app-arganza.vercel.app/",
        },
        {
            id: 7,
            title: "Youtube Clone",
            description:
                "A mobile application I created to practice using React Native and prepare for my capstone project.",
            image: "/projects/youtube.png",
            tags: ["ReactNative", "NodeJS", "Expo"],
            categories: ["Mobile App"],
            github: "https://github.com/Patargz12/youtube-clone",
            link: null,
        },
        {
            id: 8,
            title: "PatCafe",
            description:
                "My personal project using Laravel Jetstream. I used this project for my Laravel masterclass, which is presented in my internship.",
            image: "/projects/pat_cafe.jpg",
            tags: ["LaravelJetStream", "bootstrap"],
            categories: ["Web App"],
            github: "https://github.com/Patargz12/PatCafe",
            link: null,
        },
        {
            id: 9,
            title: "Salina",
            description:
                "A Software that turns podcast audio into your very own transcript. Making a content accessible across around 85 languages ",
            image: "/projects/Salina_Img.jpg",
            tags: ["ReactJS", "Tailwind", "SocketIO"],
            categories: ["Web App", "AI/ML"],
            github: null,
            link: "https://salina.app/",
        },
        {
            id: 10,
            title: "Raikou",
            description:
                "Built a RAG application for Toyota to query and analyze racing datasets provided by Toyota using AI-powered retrieval",
            image: "/projects/Raikou_Img.jpg",
            tags: ["NextJS", "MongoDB", "Google Gemini", "Express"],
            categories: ["Web App", "AI/ML", "SaaS"],
            github: "https://github.com/Patargz12/Racing_Repo",
            link: "https://salina.app/",
        },
        {
            id: 11,
            title: "DotaGPT",
            description:
                "AI-powered chatbot designed specifically for new Dota 2 players. Using Gemini 1.5 Flash, it provides real-time answers to beginner questions like counters, picks and so much more. ",
            image: "/projects/Dota_GPT.jpg",
            tags: ["NextJS", "MongoDB", "Google Gemini", "Express"],
            categories: ["Web App", "AI/ML", "SaaS"],
            github: "https://github.com/Patargz12/GPT",
            link: "https://salina.app/",
        },
        {
            id: 12,
            title: "Techbook",
            description:
                "A Dating site platform but specific only for people in the IT Industry, it has core feature of a dating site the same with like tinder and etc. ",
            image: "/projects/Techbook_Img.jpg",
            tags: ["ReactJS", "Supabase"],
            categories: ["Web App", "SaaS"],
            github: null,
            link: "https://classy-croquembouche-f908fd.netlify.app/",
        },
    ] as Project[],
}

export type ProjectsData = typeof projectsData
