"use client"

import type React from "react"

interface FloatingCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FloatingCard({ children, delay = 0, className = "" }: FloatingCardProps) {
  return (
    <div
      className={`animate-float rounded-lg border border-primary/30 bg-card/40 backdrop-blur-md p-4 shadow-lg hover:border-primary/60 transition-colors ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
