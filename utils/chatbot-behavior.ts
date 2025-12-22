export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatCallbacks {
  onChunk: (chunk: string, accumulated: string) => void
  onComplete: (content: string) => void
  onError: (error: string) => void
}

// Configuration for conversation management
export const CHAT_CONFIG = {
  MAX_HISTORY_MESSAGES: 12, // Keep last 12 messages (6 pairs of user/assistant)
  MAX_ESTIMATED_TOKENS: 8000, // Conservative limit for conversation history
  CHARS_PER_TOKEN: 4, // Rough estimation: 1 token ≈ 4 characters
}

/**
 * Estimates token count for a message or array of messages
 * Uses rough estimation: 1 token ≈ 4 characters
 */
export function estimateTokens(content: string | ChatMessage[]): number {
  if (typeof content === "string") {
    return Math.ceil(content.length / CHAT_CONFIG.CHARS_PER_TOKEN)
  }
  
  const totalChars = content.reduce((sum, msg) => sum + msg.content.length, 0)
  return Math.ceil(totalChars / CHAT_CONFIG.CHARS_PER_TOKEN)
}

/**
 * Prunes conversation history using sliding window approach
 * Keeps most recent messages within token limits
 */
export function pruneConversationHistory(history: ChatMessage[]): ChatMessage[] {
  if (history.length === 0) return history
  
  // First, limit by message count
  let pruned = history.slice(-CHAT_CONFIG.MAX_HISTORY_MESSAGES)
  
  // Then, check token count and further prune if needed
  let estimatedTokens = estimateTokens(pruned)
  
  // If still too large, keep removing oldest messages in pairs
  while (estimatedTokens > CHAT_CONFIG.MAX_ESTIMATED_TOKENS && pruned.length > 2) {
    // Remove 2 messages at a time (1 user + 1 assistant pair)
    pruned = pruned.slice(2)
    estimatedTokens = estimateTokens(pruned)
  }
  
  return pruned
}

/**
 * Formats error messages for different error types (client-side)
 */
function getErrorMessage(error: any, response?: Response): string {
  const status = response?.status
  
  // If the error message is already formatted (starts with **), pass it through
  if (error?.message && error.message.startsWith("**")) {
    return error.message
  }
  
  // Check for API key issues
  if (status === 401 || status === 403) {
    return "**Authentication Error**: Service authentication failed. Please contact the site administrator."
  }

  // Check for quota/rate limit issues
  if (status === 429) {
    return "**Rate Limit**: Too many messages sent. Please wait a moment and try again."
  }

  // Check for model availability
  if (status === 404) {
    return "**Service Unavailable**: The chat service is currently unavailable. Please try again later."
  }

  // Check for API errors
  if (status === 400) {
    return "**Invalid Request**: There was an issue with your message. Please try again."
  }

  // Check for server errors
  if (status && status >= 500) {
    return "**Server Error**: The chat service is temporarily unavailable. Please try again in a few moments."
  }

  // Check for network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "**Network Error**: Unable to connect to the chat service. Please check your internet connection."
  }

  // Check for specific error messages from API response
  if (error?.message) {
    const errorMsg = error.message.toLowerCase()
    
    if (errorMsg.includes("quota") || errorMsg.includes("insufficient")) {
      return "**API Quota Exceeded**: The chatbot has reached its usage limit. Please try again later or contact Patrick directly."
    }
    
    if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
      return "**Rate Limit**: Too many requests. Please wait before sending another message."
    }
    
    if (errorMsg.includes("timeout")) {
      return "**Timeout**: The request took too long. Please try a shorter message."
    }
    
    if (errorMsg.includes("network") || errorMsg.includes("connection")) {
      return "**Connection Error**: Unable to reach the chat service. Please check your connection."
    }
  }

  // Generic error with helpful suggestion
  return "**Unexpected Error**: Something went wrong. Please refresh the page and try again. If the issue persists, contact Patrick directly via email or LinkedIn."
}

/**
 * Streams chat response from Next.js API route (which proxies to Gemini API)
 */
async function streamChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[],
  callbacks: ChatCallbacks
): Promise<{ success: boolean; content?: string }> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage,
        conversationHistory,
      }),
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = null
      }
      throw new Error(errorData?.error || `HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let buffer = ""
    let accumulatedContent = ""

    if (!reader) {
      throw new Error("No response body reader available")
    }

    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      
      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || ""

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine) continue
        
        // Skip SSE format prefixes if present
        let jsonStr = trimmedLine
        if (trimmedLine.startsWith("data: ")) {
          jsonStr = trimmedLine.slice(6)
        }
        if (jsonStr.trim() === "[DONE]" || jsonStr.trim() === "") continue
        
        try {
          const data = JSON.parse(jsonStr)
          
          // Handle error in stream
          if (data.error) {
            // Pass through the formatted error from the server
            callbacks.onError(data.error)
            return { success: true } // Mark as success to avoid fallback
          }
          
          // Handle completion
          if (data.done) {
            accumulatedContent = data.content || accumulatedContent
            if (accumulatedContent.trim()) {
              callbacks.onComplete(accumulatedContent)
              return { success: true, content: accumulatedContent }
            }
            return { success: false }
          }
          
          // Handle chunk
          if (data.chunk) {
            accumulatedContent = data.accumulated || accumulatedContent
            callbacks.onChunk(data.chunk, accumulatedContent)
          }
        } catch (e) {
          // If it's an API error, rethrow it
          if (e instanceof Error && e.message.includes("error")) {
            throw e
          }
          continue
        }
      }
    }

    // Process any remaining buffer content
    if (buffer.trim()) {
      try {
        let jsonStr = buffer.trim()
        if (jsonStr.startsWith("data: ")) {
          jsonStr = jsonStr.slice(6)
        }
        if (jsonStr && jsonStr !== "[DONE]") {
          const data = JSON.parse(jsonStr)
          if (data.done) {
            accumulatedContent = data.content || accumulatedContent
            if (accumulatedContent.trim()) {
              callbacks.onComplete(accumulatedContent)
              return { success: true, content: accumulatedContent }
            }
          } else if (data.chunk) {
            accumulatedContent = data.accumulated || accumulatedContent
            callbacks.onChunk(data.chunk, accumulatedContent)
          }
        }
      } catch (e) {
        // Ignore parsing errors for remaining buffer
      }
    }

    if (accumulatedContent.trim()) {
      callbacks.onComplete(accumulatedContent)
      return { success: true, content: accumulatedContent }
    }

    return { success: false }
  } catch (error: any) {
    // If there's a specific error, report it
    if (error?.message) {
      callbacks.onError(getErrorMessage(error))
      return { success: true } // Mark as success to avoid fallback after reporting error
    }
    // Return failure for errors to trigger fallback
    return { success: false }
  }
}

/**
 * Gets non-streaming chat response from Next.js API route (fallback)
 */
async function getChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userMessage,
      conversationHistory,
    }),
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = null
    }
    throw new Error(errorData?.error || `HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  
  // Check if there's an error in the response
  if (data.error) {
    throw new Error(data.error)
  }
  
  return data.content || "I apologize, but I'm having trouble responding right now. Please try again or contact Patrick directly."
}

/**
 * Main function to send a chat message and get response
 * @param userMessage - The user's message
 * @param callbacks - Callbacks for handling chunks, completion, and errors
 * @param conversationHistory - Previous messages in the conversation (optional)
 */
export async function sendChatMessage(
  userMessage: string,
  callbacks: ChatCallbacks,
  conversationHistory: ChatMessage[] = []
): Promise<void> {
  // Apply sliding window to prune conversation history
  const prunedHistory = pruneConversationHistory(conversationHistory)
  
  // Try streaming first
  try {
    const streamResult = await streamChatResponse(userMessage, prunedHistory, callbacks)
    
    if (streamResult.success) {
      return
    }
  } catch (error: any) {
    // For errors, try fallback
  }

  // Fallback to non-streaming
  try {
    const content = await getChatResponse(userMessage, prunedHistory)
    callbacks.onComplete(content)
  } catch (fallbackError: any) {
    const errorMessage = getErrorMessage(fallbackError)
    callbacks.onError(errorMessage)
  }
}

