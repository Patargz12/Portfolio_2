"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageCircle, X, Send, User } from "lucide-react"
import { StreamingTypewriter } from "@/components/streaming-typewriter"
import { sendChatMessage, estimateTokens, type ChatMessage } from "@/utils/chatbot-behavior"


export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm Patrick Arganza. Feel free to ask me anything about my work, projects, or experience!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [estimatedTokens, setEstimatedTokens] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Update token estimate whenever messages change
    const conversationMessages = messages.slice(1)
    const tokens = estimateTokens(conversationMessages)
    setEstimatedTokens(tokens)
  }, [messages])

  useEffect(() => {
    // Auto-scroll to bottom when messages update (especially during streaming)
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      
      // Use requestAnimationFrame to ensure DOM has updated before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Scroll to bottom - use instant scroll during streaming for better UX
          container.scrollTo({
            top: container.scrollHeight,
            behavior: isLoading ? 'auto' : 'smooth'
          })
        })
      })
    }
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userInput = input.trim()
    const userMessage: ChatMessage = { role: "user", content: userInput }
    
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    // Create a placeholder assistant message for streaming
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "" },
    ])

    // Build conversation history with sliding window approach
    // Skip the initial greeting (index 0) and filter out empty messages
    // The pruning/sliding window logic is handled in chatbot-behavior.ts
    const conversationHistory: ChatMessage[] = messages
      .slice(1) // Skip the initial greeting message
      .filter((msg) => msg.content.trim() !== "") // Filter out any empty messages

    // Use the chatbot behavior utility with conversation history
    // The sendChatMessage function will automatically prune the history
    try {
      await sendChatMessage(userInput, {
        onChunk: (chunk, accumulated) => {
          // Update the last message (assistant message) with accumulated content
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: "assistant",
              content: accumulated,
            }
            return updated
          })
        },
        onComplete: (content) => {
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: "assistant",
              content,
            }
            return updated
          })
          setIsLoading(false)
        },
        onError: (error) => {
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: "assistant",
              content: error,
            }
            return updated
          })
          setIsLoading(false)
        },
      }, conversationHistory)
    } catch (error: any) {
      // Catch any unhandled errors to prevent Next.js error overlay
      console.error("Chat error:", error)
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: "**Error**: An unexpected error occurred. Please try again.",
        }
        return updated
      })
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      const scrollHeight = textareaRef.current.scrollHeight
      const lineHeight = 24 // approximate line height in pixels
      const maxHeight = lineHeight * 3 // 3 lines max
      
      if (scrollHeight <= maxHeight) {
        textareaRef.current.style.height = `${scrollHeight}px`
        textareaRef.current.style.overflowY = "hidden"
      } else {
        textareaRef.current.style.height = `${maxHeight}px`
        textareaRef.current.style.overflowY = "auto"
      }
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-[9999] p-4">
      {/* Chat Window */}
      <div
        className={cn(
          "w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none absolute bottom-0 right-0"
        )}
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border px-5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/Pat_Avatar.png"
                    alt="Patrick Arganza"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Patrick Arganza</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
              {/* Token usage indicator - only show if conversation is getting long */}
              {estimatedTokens > 4000 && (
                <div className="text-xs text-muted-foreground/70" title={`Estimated ${estimatedTokens.toLocaleString()} tokens used`}>
                  {estimatedTokens > 6000 ? "🔴" : "🟡"} {(estimatedTokens / 1000).toFixed(1)}k
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-foreground/70 hover:text-foreground/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={messagesContainerRef}
            className="h-[400px] overflow-y-auto p-4 space-y-4 bg-background/50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.role === "assistant" ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src="/Pat_Avatar.png"
                        alt="Patrick"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                      : "bg-muted/50 text-foreground border border-border/50"
                  )}
                >
                  {message.role === "assistant" ? (
                    message.content ? (
                      <StreamingTypewriter 
                        content={message.content} 
                        isStreaming={isLoading && index === messages.length - 1}
                      />
                    ) : isLoading && index === messages.length - 1 ? (
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      </div>
                    ) : null
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
            <div className="flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-background/60 border border-input rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring disabled:opacity-50 resize-none min-h-[40px] max-h-[72px] transition-all scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50"
                style={{ height: "auto", overflowY: "hidden" }}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-xl bg-gradient-to-br from-primary to-accent hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon-lg"
        className={cn(
          "rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:opacity-90 transition-all duration-300 absolute bottom-8 right-8",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  )
}