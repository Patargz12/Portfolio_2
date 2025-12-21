import { projectsData } from "@/constants/projects-section"
import { experienceData } from "@/constants/experience-section"
import { heroData } from "@/constants/hero-section"
import { overviewData } from "@/constants/overview-section"
import { techStackData } from "@/constants/tech-section"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatCallbacks {
  onChunk: (chunk: string, accumulated: string) => void
  onComplete: (content: string) => void
  onError: (error: string) => void
}

// Cache the portfolio context to avoid rebuilding it on every request
let cachedPortfolioContext: string | null = null

/**
 * Builds comprehensive portfolio context for the LLM
 * Uses caching to avoid rebuilding the same context string repeatedly
 */
export function buildPortfolioContext(): string {
  // Return cached context if available
  if (cachedPortfolioContext) {
    return cachedPortfolioContext
  }
  // Build projects section
  const projectsList = projectsData.projects
    .map(
      (project) =>
        `- ${project.title}: ${project.description} (Technologies: ${project.tags.join(", ")})${project.link ? ` | Live: ${project.link}` : ""}${project.github ? ` | GitHub: ${project.github}` : ""}`
    )
    .join("\n")

  // Build experience section
  const experienceList = experienceData.experiences
    .map(
      (exp) =>
        `- ${exp.title} at ${exp.company} (${exp.period}):\n  ${exp.responsibilities.map((r) => `  • ${r}`).join("\n")}`
    )
    .join("\n\n")

  // Build tech stack section
  const allTechCategories = [
    ...techStackData.categories,
    ...techStackData.additionalCategories,
  ]
  const techStackList = allTechCategories
    .map(
      (cat) =>
        `${cat.title}: ${cat.technologies.join(", ")}`
    )
    .join("\n")

  // Build achievements section
  const achievementsList = [
    ...heroData.achievements.map(ach => ({ ...ach, description: undefined })),
    ...overviewData.achievements,
  ]
    .map(
      (ach) =>
        `- ${ach.title}: ${ach.subtitle || ""}${"description" in ach && ach.description ? ` - ${ach.description.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim()}` : ""}`
    )
    .join("\n")

  const contextString = `You ARE Patrick Arganza, a Full-Stack Software Engineer. You are speaking directly to visitors on your portfolio website. Respond as yourself, in first person, as if you are having a real conversation.

## Your Identity
You are Patrick Arganza. When asked "Who are you?" or similar questions, respond as yourself: "I am Patrick Arganza" or "I'm Patrick Arganza, a Full-Stack Software Engineer."

## About You
${overviewData.mainSection.description.replace(/<br\s*\/?>/gi, "\n").replace(/\s+/g, " ").trim()}

## Your Professional Summary
${heroData.description.text}

## Your Tech Stack
${techStackList}

## Your Work Experience
${experienceList}

## Your Featured Projects
${projectsList}

## Your Achievements
${achievementsList}

## Your Social Links
- GitHub: ${heroData.socialLinks.find((s) => s.platform === "GitHub")?.url || "Not available"}
- LinkedIn: ${heroData.socialLinks.find((s) => s.platform === "LinkedIn")?.url || "Not available"}
- Instagram: ${heroData.socialLinks.find((s) => s.platform === "Instagram")?.url || "Not available"}

## How to Respond
- You ARE Patrick Arganza - speak in first person (I, me, my) not third person (he, his, Patrick's)
- Be authentic, friendly, and conversational - like you're talking to someone at a networking event
- Share your experiences, projects, and skills as if they're your own (because they are!)
- If asked about something not in your portfolio, be honest: "I haven't worked on that yet" or "That's not something I've done, but I'd love to learn about it"
- When discussing projects, speak about them as your own work: "I built..." or "I developed..."
- When discussing experience, reference your roles naturally: "When I worked at..." or "During my time as..."
- Be enthusiastic about your work and projects
- Keep responses natural and conversational, not robotic or overly formal`
  
  // Cache the context for future use
  cachedPortfolioContext = contextString
  return contextString
}

/**
 * Formats error messages for different error types
 */
export function getErrorMessage(error: any, response?: Response): string {
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
 * Creates the request body for Gemini API with conversation history support
 * @param userMessage - The current user message
 * @param portfolioContext - The portfolio context (only included in first message)
 * @param conversationHistory - Previous messages in the conversation (excluding the current user message)
 * @param isFirstMessage - Whether this is the first message in the conversation
 */
function createChatRequest(
  userMessage: string,
  portfolioContext: string,
  conversationHistory: ChatMessage[] = [],
  isFirstMessage: boolean = false
) {
  const contents: Array<{ role?: string; parts: Array<{ text: string }> }> = []

  // First message: include portfolio context
  if (isFirstMessage) {
    contents.push({
      parts: [
        {
          text: `${portfolioContext}\n\nUser question: ${userMessage}\n\nRespond as Patrick Arganza in first person. Be authentic, conversational, and enthusiastic about your work.`,
        },
      ],
    })
  } else {
    // Subsequent messages: include conversation history with proper roles
    // Add all previous messages from conversation history with their roles
    for (const msg of conversationHistory) {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [
          {
            text: msg.content,
          },
        ],
      })
    }
    
    // Add the current user message
    contents.push({
      role: "user",
      parts: [
        {
          text: userMessage,
        },
      ],
    })
  }

  return {
    contents,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 2048,
    },
  }
}

/**
 * Streams chat response from Gemini API
 */
async function streamChatResponse(
  apiKey: string,
  requestBody: ReturnType<typeof createChatRequest>,
  callbacks: ChatCallbacks
): Promise<{ success: boolean; content?: string }> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      // For auth errors, don't try fallback
      if (response.status === 401 || response.status === 403) {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = null
        }
        throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`)
      }
      // For other errors, mark as failed to trigger fallback
      throw new Error("Streaming request failed")
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
            throw new Error(data.error.message || "API error occurred")
          }
          
          // Extract text from different possible response structures
          const textChunk = 
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            data.candidates?.[0]?.delta?.text ||
            data.text ||
            ""
          
          if (textChunk) {
            accumulatedContent += textChunk
            callbacks.onChunk(textChunk, accumulatedContent)
          }
        } catch (e) {
          // If it's a JSON parse error, skip this line
          // If it's an API error, rethrow it
          if (e instanceof Error && e.message.includes("API error")) {
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
          const textChunk = 
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            data.candidates?.[0]?.delta?.text ||
            data.text ||
            ""
          if (textChunk) {
            accumulatedContent += textChunk
            callbacks.onChunk(textChunk, accumulatedContent)
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
    // Re-throw auth errors immediately
    if (error.message && error.message.includes("API key")) {
      throw error
    }
    // Return failure for other errors to trigger fallback
    return { success: false }
  }
}

/**
 * Gets non-streaming chat response from Gemini API (fallback)
 */
async function getChatResponse(
  apiKey: string,
  requestBody: ReturnType<typeof createChatRequest>
): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  )

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = null
    }
    throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I apologize, but I'm having trouble connecting right now. Please try again later."
  )
}

/**
 * Main function to send a chat message and get response
 * @param userMessage - The user's message
 * @param apiKey - The Gemini API key
 * @param callbacks - Callbacks for handling chunks, completion, and errors
 * @param conversationHistory - Previous messages in the conversation (optional)
 */
export async function sendChatMessage(
  userMessage: string,
  apiKey: string,
  callbacks: ChatCallbacks,
  conversationHistory: ChatMessage[] = []
): Promise<void> {
  // Validate API key
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    callbacks.onError("**Configuration Error**: API key not configured. Please set your `NEXT_PUBLIC_GEMINI_API_KEY` environment variable.")
    return
  }

  // Build portfolio context (cached, so it's fast)
  const portfolioContext = buildPortfolioContext()
  
  // Determine if this is the first message (no conversation history)
  const isFirstMessage = conversationHistory.length === 0
  
  // Create request body with conversation history
  const requestBody = createChatRequest(userMessage, portfolioContext, conversationHistory, isFirstMessage)

  // Try streaming first
  try {
    const streamResult = await streamChatResponse(apiKey, requestBody, callbacks)
    
    if (streamResult.success) {
      return
    }
  } catch (error: any) {
    // If it's an auth error, show error immediately
    if (error.message && error.message.includes("API key")) {
      const errorMessage = getErrorMessage(error)
      callbacks.onError(errorMessage)
      return
    }
    // For other errors, try fallback
  }

  // Fallback to non-streaming
  try {
    console.warn("Using non-streaming fallback...")
    const content = await getChatResponse(apiKey, requestBody)
    callbacks.onComplete(content)
  } catch (fallbackError: any) {
    console.error("Fallback error:", fallbackError)
    const errorMessage = getErrorMessage(fallbackError)
    callbacks.onError(errorMessage)
  }
}

