import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Patrick Arganza | Portfolio",
  description:
    "Full-stack web developer specializing in React, Node.js, MongoDB, and Express. Building scalable web applications.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/Portfolio_Icon.ico",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/Portfolio_Icon.ico",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/Portfolio_Icon.ico",
    shortcut: "/Portfolio_Icon.ico",
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
        <Analytics />
      </body>
    </html>
  )
}
