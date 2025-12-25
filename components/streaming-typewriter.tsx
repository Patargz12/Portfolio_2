"use client"

import { motion } from "motion/react"
import { Streamdown } from "streamdown"
import { useEffect, useState } from "react"

interface StreamingTypewriterProps {
  content: string
  isStreaming: boolean
}

export function StreamingTypewriter({ content, isStreaming }: StreamingTypewriterProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // If streaming, show content immediately as it arrives
    if (isStreaming) {
      setDisplayedContent(content)
      setCurrentIndex(content.length)
      return
    }

    // If not streaming and content is new, animate it
    if (content && currentIndex < content.length) {
      const timer = setTimeout(() => {
        // Show multiple characters at once for much faster effect
        const charsToAdd = 5 // Display 5 characters per frame
        setCurrentIndex((prev) => Math.min(prev + charsToAdd, content.length))
        setDisplayedContent(content.slice(0, Math.min(currentIndex + charsToAdd, content.length)))
      }, 1) // 1ms interval with multiple characters per frame

      return () => clearTimeout(timer)
    }
  }, [content, currentIndex, isStreaming])

  // Reset when content changes to new message
  useEffect(() => {
    if (!isStreaming && content !== displayedContent) {
      setCurrentIndex(0)
      setDisplayedContent("")
    }
  }, [content, isStreaming])

  return (
    <span className="inline">
      <Streamdown>{displayedContent}</Streamdown>
      {isStreaming && currentIndex < content.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block ml-0.5 rounded-sm w-[2px] h-[1em] bg-primary align-middle"
        />
      )}
    </span>
  )
}
