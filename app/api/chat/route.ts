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

// Token management configuration
const TOKEN_CONFIG = {
  MAX_CONVERSATION_TOKENS: 8000, // Maximum tokens for conversation history
  MAX_TOTAL_TOKENS: 30000, // Maximum total tokens (context + history + response)
  CHARS_PER_TOKEN: 4, // Rough estimation
}

/**
 * Estimates token count for text
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / TOKEN_CONFIG.CHARS_PER_TOKEN)
}

/**
 * Estimates total tokens for conversation history
 */
function estimateHistoryTokens(history: ChatMessage[]): number {
  const totalChars = history.reduce((sum, msg) => sum + msg.content.length, 0)
  return Math.ceil(totalChars / TOKEN_CONFIG.CHARS_PER_TOKEN)
}

// Cache the portfolio context to avoid rebuilding it on every request
let cachedPortfolioContext: string | null = null
let cachedContextTokens: number = 0

/**
 * Pre-validation filter to detect and reject obviously off-topic questions
 * Returns null if question is acceptable, or an error message if it should be rejected
 */
function validateQuestionRelevance(userMessage: string): string | null {
  const lowerMessage = userMessage.toLowerCase().trim()
  
  // Define patterns for clearly off-topic questions
  const offTopicPatterns = [
    // General knowledge questions
    /^what is (love|life|happiness|the meaning of)/i,
    /^(tell me|what's|what is) (a joke|the weather|the time|the date)/i,
    /^(how (do|does|did|can|could|should|would)|what (is|are|was|were)) (python|javascript|react|typescript|java|c\+\+|css|html)/i,
    /^(calculate|solve|compute|what is).*\d+.*[+\-*/÷×]/i, // Math calculations
    /^(translate|what does.*mean in|how do you say)/i,
    /^(write|create|build|make|generate) (code|a function|a program|an app)/i,
    /^(debug|fix|help me with) (my|this|the) code/i,
    /^(what|who|when|where|why) (is|are|was|were|did).*(trump|biden|obama|politics|election|president|war|covid)/i,
    /^(write|compose|create) (a|an) (essay|story|poem|song|article)/i,
    /^(summarize|explain|tell me about).*(news|article|current events)/i,
    /^(how to|teach me|explain|show me how).*(cook|recipe|workout|exercise|travel)/i,
  ]
  
  // Check if the message matches any off-topic pattern
  for (const pattern of offTopicPatterns) {
    if (pattern.test(lowerMessage)) {
      return "I'm sorry, but I'm specifically designed to answer questions about my work experience, projects, and professional background**. I'd be happy to tell you about my skills, projects, work experience, or achievements! What would you like to know?"
    }
  }
  
  // Check for very short generic questions that are likely off-topic
  const genericQuestions = [
    'hello', 'hi', 'hey', 'what\'s up', 'how are you', 'good morning', 'good afternoon', 'good evening',
  ]
  
  // Allow greetings (return null means acceptable)
  if (genericQuestions.some(greeting => lowerMessage === greeting || lowerMessage === greeting + '?')) {
    return null // Greetings are acceptable
  }
  
  return null // Message passed validation
}

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

## CRITICAL INSTRUCTION - STRICT TOPIC BOUNDARIES
⚠️ YOU MUST ONLY DISCUSS PATRICK ARGANZA'S PORTFOLIO. THIS IS NON-NEGOTIABLE. ⚠️

You are a specialized assistant created exclusively to answer questions about Patrick Arganza's professional portfolio, work experience, projects, technical skills, and career background. You MUST IMMEDIATELY REFUSE any question that falls outside these boundaries.

### ✅ ACCEPTABLE TOPICS (Answer these naturally and enthusiastically):
- Patrick's work experience, roles, and responsibilities
- Patrick's projects, their features, and technologies used
- Patrick's technical skills, tech stack, and expertise
- Patrick's achievements, certifications, and accomplishments
- Patrick's education and academic background
- How to contact Patrick or connect with him professionally
- Patrick's approach to software development and problem-solving
- Specific details about technologies Patrick has used IN HIS PROJECTS
- Patrick's career journey and professional growth
- Anything visible or mentioned in Patrick's portfolio

### ❌ FORBIDDEN TOPICS (Reject immediately with the standard refusal):
- General programming tutorials or "how to" coding questions
- Explanations of technologies/concepts not directly tied to Patrick's work
- Writing, debugging, or reviewing code for the user
- Current events, news, politics, or social issues
- Other people, companies, or professionals (unless mentioned in Patrick's experience)
- Personal advice unrelated to Patrick's career path
- Mathematical calculations, translations, or general knowledge
- Entertainment requests (jokes, stories, games, etc.)
- Philosophical questions ("what is love", "meaning of life", etc.)
- Any request to roleplay or pretend to be someone else
- ANY topic not directly related to Patrick Arganza's professional portfolio

### 🚫 MANDATORY REFUSAL RESPONSE (Use this EXACT format for ALL off-topic questions):
When a user asks ANYTHING outside the acceptable topics, you MUST respond with:

"I'm sorry, but I'm specifically designed to answer questions about my work experience, projects, and professional background. I'd be happy to tell you about my skills, projects, work experience, or achievements! What would you like to know?"

### Example Off-Topic Scenarios:
- User: "What is React?" → Use refusal response (even though Patrick uses React, they're asking for a tutorial)
- User: "Tell me a joke" → Use refusal response
- User: "What's the weather?" → Use refusal response
- User: "Help me debug my code" → Use refusal response
- User: "What is love?" → Use refusal response
- User: "Write a Python function" → Use refusal response

### Example On-Topic Scenarios:
- User: "What projects has Patrick worked on?" → Answer enthusiastically about the projects
- User: "Does Patrick know React?" → Answer about Patrick's React experience
- User: "Tell me about Patrick's work at PRAXXYS" → Share details about that role
- User: "How can I contact Patrick?" → Provide contact information

## How to Respond (for On-Topic Questions)
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
  cachedContextTokens = estimateTokens(contextString)
  return contextString
}

/**
 * Creates the request body for Gemini API with conversation history support
 * Includes token management and validation
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
    // History is already pruned by client-side logic, but double-check token limits
    const historyTokens = estimateHistoryTokens(conversationHistory)
    
    // If history is still too large (shouldn't happen with client-side pruning), further trim
    let trimmedHistory = conversationHistory
    if (historyTokens > TOKEN_CONFIG.MAX_CONVERSATION_TOKENS) {
      // Keep only the most recent messages that fit within limit
      while (trimmedHistory.length > 2 && estimateHistoryTokens(trimmedHistory) > TOKEN_CONFIG.MAX_CONVERSATION_TOKENS) {
        trimmedHistory = trimmedHistory.slice(2) // Remove pairs
      }
    }
    
    for (const msg of trimmedHistory) {
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
    return "**Authentication Error**: Invalid API key. Please contact the site administrator."
  }

  // Check for quota/rate limit issues
  if (status === 429) {
    const errorMsg = error?.message?.toLowerCase() || ""
    
    // Check if it's a quota exhaustion vs rate limit
    if (errorMsg.includes("quota") || errorMsg.includes("insufficient")) {
      return "**API Quota Exceeded**: The chatbot has reached its daily usage limit. Please try again later or contact Patrick directly via email or LinkedIn."
    }
    
    return "**Rate Limit**: Too many messages sent too quickly. Please wait a moment and try again."
  }

  // Check for model availability
  if (status === 404) {
    return "**Service Unavailable**: The chat service is currently unavailable. Please try again later."
  }

  // Check for API errors with detailed messages
  if (status === 400) {
    const errorMsg = error?.message || ""
    
    // Check for specific error types in the message
    if (errorMsg.includes("token") || errorMsg.includes("length") || errorMsg.includes("too long")) {
      return "**Message Too Long**: Your message or conversation history is too long. Please try a shorter message or refresh the chat to start over."
    }
    
    if (errorMsg.includes("invalid") && errorMsg.includes("content")) {
      return "**Invalid Content**: Your message contains unsupported content. Please try rephrasing your question."
    }
    
    if (errorMsg.includes("safety") || errorMsg.includes("blocked")) {
      return "**Content Blocked**: Your message was blocked by safety filters. Please rephrase your question."
    }
    
    return "**Invalid Request**: There was an issue with your message. Please try again with a different question."
  }

  // Check for server errors
  if (status && status >= 500) {
    return "**Server Error**: The chat service is temporarily unavailable. Please try again in a few moments."
  }

  // Check for network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "**Network Error**: Unable to connect to the chat service. Please check your internet connection and try again."
  }

  // Check for specific error messages from API response
  if (error?.message) {
    const errorMsg = error.message.toLowerCase()
    
    if (errorMsg.includes("api key") || errorMsg.includes("authentication")) {
      return "**Authentication Error**: Service authentication failed. Please contact the site administrator."
    }
    
    if (errorMsg.includes("quota") || errorMsg.includes("insufficient")) {
      return "**API Quota Exceeded**: The chatbot has reached its usage limit. Please try again later or contact Patrick directly."
    }
    
    if (errorMsg.includes("rate limit") || errorMsg.includes("too many requests")) {
      return "**Rate Limit**: Too many requests. Please wait a moment before sending another message."
    }
    
    if (errorMsg.includes("model")) {
      return "**Service Error**: The chat model is temporarily unavailable. Please try again later."
    }
    
    if (errorMsg.includes("timeout")) {
      return "**Timeout Error**: The request took too long. Please try again with a shorter message."
    }
    
    if (errorMsg.includes("network") || errorMsg.includes("connection")) {
      return "**Connection Error**: Unable to reach the chat service. Please check your connection and try again."
    }
  }

  // Generic error with suggestion
  return "**Unexpected Error**: Something went wrong. Please refresh the page and try again. If the problem persists, feel free to contact Patrick directly via email or LinkedIn."
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

    // Pre-validate question relevance to catch obviously off-topic questions
    const validationError = validateQuestionRelevance(userMessage)
    if (validationError) {
      // Return the refusal message immediately without calling the API
      return Response.json({ content: validationError })
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
        // Parse error response for detailed error message
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = null
        }
        
        // Extract detailed error information
        const errorDetails = errorData?.error?.message || errorData?.message || `HTTP error! status: ${response.status}`
        const error = new Error(errorDetails)
        
        // For critical errors (auth, rate limit, quota), return immediately
        if (response.status === 401 || response.status === 403 || response.status === 429) {
          const errorMessage = getErrorMessage(error, response)
          return Response.json({ error: errorMessage }, { status: response.status })
        }
        
        // For other errors, try to get detailed message and attempt fallback
        throw new Error(errorDetails)
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
            }

            // Parse the complete response (Gemini returns a JSON array)
            try {
              // Remove any leading/trailing whitespace and check if it's an array
              const trimmedBuffer = buffer.trim()
              
              let responseData
              if (trimmedBuffer.startsWith("[")) {
                // It's an array of chunks
                responseData = JSON.parse(trimmedBuffer)
                
                // Process each chunk in the array
                for (const chunk of responseData) {
                  if (chunk.error) {
                    const error = new Error(chunk.error.message || "API error occurred")
                    const errorMessage = getErrorMessage(error)
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                    controller.close()
                    return
                  }
                  
                  // Check for blocked content or safety issues
                  if (chunk.candidates?.[0]?.finishReason === "SAFETY") {
                    const errorMessage = "**Content Blocked**: Your message was blocked by safety filters. Please rephrase your question."
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                    controller.close()
                    return
                  }
                  
                  if (chunk.candidates?.[0]?.finishReason === "RECITATION") {
                    const errorMessage = "**Content Blocked**: Response was blocked due to content policy. Please try a different question."
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                    controller.close()
                    return
                  }
                  
                  const textChunk = 
                    chunk.candidates?.[0]?.content?.parts?.[0]?.text ||
                    chunk.candidates?.[0]?.delta?.text ||
                    chunk.text ||
                    ""
                  
                  if (textChunk) {
                    accumulatedContent += textChunk
                    // Send chunk to client
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify({ chunk: textChunk, accumulated: accumulatedContent })}\n\n`)
                    )
                  }
                }
              } else {
                // Single object response
                responseData = JSON.parse(trimmedBuffer)
                
                if (responseData.error) {
                  const error = new Error(responseData.error.message || "API error occurred")
                  const errorMessage = getErrorMessage(error)
                  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                  controller.close()
                  return
                }
                
                // Check for blocked content
                if (responseData.candidates?.[0]?.finishReason === "SAFETY" || responseData.candidates?.[0]?.finishReason === "RECITATION") {
                  const errorMessage = "**Content Blocked**: The response was blocked by safety filters. Please try a different question."
                  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
                  controller.close()
                  return
                }
                
                const textChunk = 
                  responseData.candidates?.[0]?.content?.parts?.[0]?.text ||
                  responseData.candidates?.[0]?.delta?.text ||
                  responseData.text ||
                  ""
                
                if (textChunk) {
                  accumulatedContent = textChunk
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify({ chunk: textChunk, accumulated: accumulatedContent })}\n\n`)
                  )
                }
              }
            } catch (parseError: any) {
              // Handle parse errors with detailed message
              const errorMessage = getErrorMessage(parseError)
              controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`))
              controller.close()
              return
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
          const errorDetails = errorData?.error?.message || errorData?.message || `HTTP error! status: ${fallbackResponse.status}`
          const error = new Error(errorDetails)
          const errorMessage = getErrorMessage(error, fallbackResponse)
          return Response.json({ error: errorMessage }, { status: fallbackResponse.status })
        }

        const data = await fallbackResponse.json()
        
        // Check for errors or blocked content in response
        if (data.error) {
          const error = new Error(data.error.message || "API error occurred")
          const errorMessage = getErrorMessage(error)
          return Response.json({ error: errorMessage }, { status: 500 })
        }
        
        // Check for blocked content
        if (data.candidates?.[0]?.finishReason === "SAFETY" || data.candidates?.[0]?.finishReason === "RECITATION") {
          return Response.json({ 
            error: "**Content Blocked**: The response was blocked by safety filters. Please try a different question." 
          }, { status: 400 })
        }
        
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I apologize, but I'm having trouble responding right now. Please try again or contact Patrick directly."

        return Response.json({ content })
      } catch (fallbackError: any) {
        const errorMessage = getErrorMessage(fallbackError)
        return Response.json({ error: errorMessage }, { status: 500 })
      }
    }
  } catch (error: any) {
    const errorMessage = getErrorMessage(error)
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}

