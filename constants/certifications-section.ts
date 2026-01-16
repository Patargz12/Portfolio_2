export interface Certification {
    id: number
    title: string
    organization: string
    url: string
}

export const certificationsData = {
    header: {
        title: "Professional",
        highlightedWord: "Certifications",
        subtitle: "Recognized achievements and professional credentials",
    },
    certifications: [
        {
            id: 1,
            title: "Introduction to Internet of Things",
            organization: "Microsoft",
            url: "https://heyzine.com/flip-book/275de4dac2.html",
        },
        {
            id: 2,
            title: "Software Engineer",
            organization: "HackerRank",
            url: "https://www.hackerrank.com/certificates/c5416a5b5309",
        },
        {
            id: 3,
            title: "NodeJS intermediate level",
            organization: "HackerRank",
            url: "https://www.hackerrank.com/certificates/ac696fdf8a7d",
        },
        {
            id: 4,
            title: "Microsoft Cloud Computing",
            organization: "Microsoft",
            url: "https://learn.microsoft.com/en-us/users/patrickarganza-2277/achievements/psehvv64?ref=https%3A%2F%2Fwww.linkedin.com%2F",
        },
        {
            id: 5,
            title: "Frontend Training Certificate",
            organization: "PRAXXYS Solutions Inc.",
            url: "https://heyzine.com/flip-book/c438def162.html#page/1",
        },
        {
            id: 6,
            title: "JavaScript intermediate level",
            organization: "HackerRank",
            url: "https://www.hackerrank.com/certificates/f0d596898548",
        },
        {
            id: 7,
            title: "Frontend Development Libraries",
            organization: "FreeCodeCamp",
            url: "https://www.freecodecamp.org/certification/pat_argz/front-end-development-libraries",
        },
        {
            id: 8,
            title: "AppCon Hackathon Certificate",
            organization: "AppCon Japan",
            url: "https://drive.google.com/file/d/1ybqmMYc3tSKxAz-lDVN3SQzt8xjgPXIL/view",
        },
        {
            id: 9,
            title: "JavaScript Algorithms and Data Structures",
            organization: "FreeCodeCamp",
            url: "https://www.freecodecamp.org/certification/pat_argz/javascript-algorithms-and-data-structures-v8",
        },
        {
            id: 10,
            title: "Microsoft: Describe Cloud Concepts",
            organization: "Microsoft",
            url: "https://learn.microsoft.com/en-us/users/patrickarganza-2277/achievements/ux9q6xk3?ref=https%3A%2F%2Fwww.linkedin.com%2F",
        },
        {
            id: 11,
            title: "Software Engineer Intern",
            organization: "HackerRank",
            url: "https://www.hackerrank.com/certificates/2ab2f7c3c3cf",
        },
        {
            id: 12,
            title: "JavaScript Essentials",
            organization: "Cisco",
            url: "https://www.linkedin.com/in/patrick-arganza-816331173/details/certifications/1725551654103/single-media-viewer/?profileId=ACoAACkpUlIB1wR-8UQSfygLuesQphPjy8O5NqE",
        },
        {
            id: 13,
            title: "Microsoft Introduction to Git",
            organization: "Microsoft",
            url: "https://learn.microsoft.com/en-us/users/patrickarganza-2277/achievements/qdfdyube",
        },
        {
            id: 14,
            title: "Mobile Dev Lead Certificate",
            organization: "Google Developer Student Club",
            url: "https://www.linkedin.com/in/patrick-arganza-816331173/details/certifications/1725554620609/single-media-viewer/?profileId=ACoAACkpUlIB1wR-8UQSfygLuesQphPjy8O5NqE",
        },
    ] as Certification[],
}

export type CertificationsData = typeof certificationsData


