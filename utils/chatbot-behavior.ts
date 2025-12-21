export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatCallbacks {
  onChunk: (chunk: string, accumulated: string) => void
  onComplete: (content: string) => void
  onError: (error: string) => void
}

/**
 * Formats error messages for different error types
 */
function getErrorMessage(error: any, response?: Response): string {
  const status = response?.status
  
  // Check for API key issues
  if (status === 401 || status === 403) {
    return "**Authentication Error**: Invalid API key. Please check your Gemini API key configuration."
  }

  // Check for quota/token issues
  if (status === 429) {
    return "**Rate Limit Exceeded**: Too many requests. Please try again later."
  }

  // Check for model availability
  if (status === 404) {
    return "**Model Not Found**: The chat model may have expired or is unavailable. Please check the model name."
  }

  // Check for API errors
  if (status === 400) {
    return "**Bad Request**: Invalid request format. Please try again."
  }

  // Check for server errors
  if (status && status >= 500) {
    return "**Server Error**: The API service is temporarily unavailable. Please try again later."
  }

  // Check for network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "**Network Error**: Unable to connect to the API. Please check your internet connection."
  }

  // Check for specific error messages from API response
  if (error?.message) {
    if (error.message.includes("API key") || error.message.includes("authentication")) {
      return "**Authentication Error**: Invalid or missing API key."
    }
    if (error.message.includes("quota") || error.message.includes("limit")) {
      return "**Quota Exceeded**: No tokens available. Please check your API quota."
    }
    if (error.message.includes("model")) {
      return "**Model Error**: Chat model expired or unavailable."
    }
  }

  // Generic error
  return "**Error**: An unexpected error occurred. Please try again."
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
            throw new Error(data.error)
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
  return data.content || "I apologize, but I'm having trouble connecting right now. Please try again later."
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
  // Try streaming first
  try {
    const streamResult = await streamChatResponse(userMessage, conversationHistory, callbacks)
    
    if (streamResult.success) {
      return
    }
  } catch (error: any) {
    // For errors, try fallback
  }

  // Fallback to non-streaming
  try {
    console.warn("Using non-streaming fallback...")
    const content = await getChatResponse(userMessage, conversationHistory)
    callbacks.onComplete(content)
  } catch (fallbackError: any) {
    console.error("Fallback error:", fallbackError)
    const errorMessage = getErrorMessage(fallbackError)
    callbacks.onError(errorMessage)
  }
}

