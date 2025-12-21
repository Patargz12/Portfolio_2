import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"
import { ChatWidget } from "@/components/chat-component"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Patrick Arganza | Full-Stack Developer",
  description:
    "Full-stack Software Engineer specializing in React, Next, Node.js, MongoDB, and Express. Building scalable web applications.",
  icons: {
    icon: "/Portfolio_Icon.ico",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased relative`}>
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
