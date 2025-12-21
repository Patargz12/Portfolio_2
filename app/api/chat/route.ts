import { NextRequest } from "next/server"
import { projectsData } from "@/constants/projects-section"
import { experienceData } from "@/constants/experience-section"
import { heroData } from "@/constants/hero-section"
import { overviewData } from "@/constants/overview-section"
import { techStackData } from "@/constants/tech-section"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

// Cache the portfolio context to avoid rebuilding it on every request
let cachedPortfolioContext: string | null = null

/**
 * Builds comprehensive portfolio context for the LLM
 * Uses caching to avoid rebuilding the same context string repeatedly
 */
function buildPortfolioContext(): string {
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
 * Creates the request body for Gemini API with conversation history support
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

export async function POST(request: NextRequest) {
  try {
    // Get API key from server-side environment variable (secure)
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json(
        { error: "**Configuration Error**: API key not configured. Please set your `GEMINI_API_KEY` environment variable." },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { userMessage, conversationHistory = [] } = body

    if (!userMessage || typeof userMessage !== "string") {
      return Response.json(
        { error: "Invalid request: userMessage is required" },
        { status: 400 }
      )
    }

    // Build portfolio context
    const portfolioContext = buildPortfolioContext()
    
    // Determine if this is the first message
    const isFirstMessage = conversationHistory.length === 0
    
    // Create request body for Gemini
    const requestBody = createChatRequest(userMessage, portfolioContext, conversationHistory, isFirstMessage)

    // Try streaming first
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
          const errorMessage = getErrorMessage(
            new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`),
            response
          )
          return Response.json({ error: errorMessage }, { status: response.status })
        }
        // For other errors, mark as failed to trigger fallback
        throw new Error("Streaming request failed")
      }

      // Create a streaming response
      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader()
          const decoder = new TextDecoder()
          let buffer = ""
          let accumulatedContent = ""

          if (!reader) {
            controller.close()
            return
          }

          try {
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
                    const errorMessage = getErrorMessage(
                      new Error(data.error.message || "API error occurred"),
                      response
                    )
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                    controller.close()
                    return
                  }
                  
                  // Extract text from different possible response structures
                  const textChunk = 
                    data.candidates?.[0]?.content?.parts?.[0]?.text ||
                    data.candidates?.[0]?.delta?.text ||
                    data.text ||
                    ""
                  
                  if (textChunk) {
                    accumulatedContent += textChunk
                    // Send chunk to client
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify({ chunk: textChunk, accumulated: accumulatedContent })}\n\n`)
                    )
                  }
                } catch (e) {
                  // If it's a JSON parse error, skip this line
                  // If it's an API error, handle it
                  if (e instanceof Error && e.message.includes("API error")) {
                    const errorMessage = getErrorMessage(e, response)
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                    controller.close()
                    return
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
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify({ chunk: textChunk, accumulated: accumulatedContent })}\n\n`)
                    )
                  }
                }
              } catch (e) {
                // Ignore parsing errors for remaining buffer
              }
            }

            // Send completion
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ done: true, content: accumulatedContent })}\n\n`)
            )
            controller.close()
          } catch (error: any) {
            const errorMessage = getErrorMessage(error)
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
            controller.close()
          }
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      })
    } catch (streamError: any) {
      // Fallback to non-streaming
      console.warn("Streaming failed, falling back to non-streaming:", streamError)
      
      try {
        const fallbackResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        )

        if (!fallbackResponse.ok) {
          let errorData
          try {
            errorData = await fallbackResponse.json()
          } catch {
            errorData = null
          }
          const errorMessage = getErrorMessage(
            new Error(errorData?.error?.message || `HTTP error! status: ${fallbackResponse.status}`),
            fallbackResponse
          )
          return Response.json({ error: errorMessage }, { status: fallbackResponse.status })
        }

        const data = await fallbackResponse.json()
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I apologize, but I'm having trouble connecting right now. Please try again later."

        return Response.json({ content })
      } catch (fallbackError: any) {
        console.error("Fallback error:", fallbackError)
        const errorMessage = getErrorMessage(fallbackError)
        return Response.json({ error: errorMessage }, { status: 500 })
      }
    }
  } catch (error: any) {
    console.error("API route error:", error)
    return Response.json(
      { error: "**Error**: An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

