import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import {
  getOrCreateUser,
  getOrCreateConversation,
  saveMessage,
} from "@/lib/chat"; // Import helper functions

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { user_id, messages: userMessages } = await req.json();
    console.log("Received request data:", { user_id, userMessages });

    if (!user_id || !userMessages) {
      console.error("Missing user_id or messages in the request body");
      return new Response("Invalid input", { status: 400 });
    }

    // Get or create user
    const userId = await getOrCreateUser(user_id);
    console.log("User ID:", userId);

    // Get or create conversation
    const conversationId = await getOrCreateConversation(userId);
    console.log("Conversation ID:", conversationId);

    // Extracting the user's last message for saving to DB
    const lastUserMessage = userMessages[userMessages.length - 1].content;
    
    // Add system message for AI context
    const messagesWithSystem = [
      ...userMessages,
      {
        role: "system",
        content: `Your name is Negotiation AI. You are a skilled negotiation coach helping users improve their negotiation strategies. Keep responses under 3 sentences unless asked to elaborate. Thank the user when the session ends and ask for a rating.`,
      }
    ];

    // Save user message to the database
    await saveMessage(conversationId, "user", lastUserMessage);
    console.log("User message saved to DB");

    // Send user messages to AI
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: messagesWithSystem,
    });

    // Get the response as a stream
    const aiResponse = await result.toDataStreamResponse({
      sendUsage: false,
      getErrorMessage: (error) => {
        console.error("AI Error:", error);
        return "An error occurred while generating a response. Please try again.";
      },
    });

    // Check if aiResponse.body exists
    if (!aiResponse.body) {
      console.error("AI response body is null");
      return new Response(JSON.stringify({ 
        error: "Failed to get response stream from AI service." 
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Clone the stream so we can use it in two places
    const [stream1, stream2] = aiResponse.body.tee();

    // Process one stream to save to DB
    let completeResponse = '';
    
    // Start a background task to save the complete message once assembled
    (async () => {
      const reader = stream1.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) {
            completeResponse += new TextDecoder().decode(value);
          }
        }
        // Save the complete AI response to DB once streaming is finished
        await saveMessage(conversationId, "ai", completeResponse);
        console.log("AI message saved to DB:", completeResponse);
      } catch (error) {
        console.error("Error processing AI response stream:", error);
      }
    })();

    // Return the other stream to the client
    return new Response(stream2, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        ...aiResponse.headers
      }
    });
    
  } catch (error) {
    console.error("Error in chat processing:", error);
    return new Response(JSON.stringify({ 
      error: "An error occurred processing your request." 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}