import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import {
  getOrCreateUser,
  getOrCreateConversation,
  saveMessage,
} from "@/lib/chat"; // im curious if this can be its own route.

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
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
    const conversationId = await getOrCreateConversation();
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

    // Save user message to the database (disabled - Supabase commented out)
    // await saveMessage(conversationId, "user", lastUserMessage);
    console.log("User message saved to DB (disabled)");

    // Send user messages to AI
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: messagesWithSystem,
    });

    // Get the text stream and process it
    const stream = result.textStream;
    const reader = stream.getReader();
    const encoder = new TextEncoder();
    let aiText = "";

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    (async () => {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          // textStream returns strings directly
          const chunk = typeof value === 'string' ? value : new TextDecoder().decode(value);
          aiText += chunk;
          await writer.write(encoder.encode(chunk));
        }

        await writer.close();

        // Save the complete AI response to DB once streaming is finished (disabled - Supabase commented out)
        // if (aiText.trim()) {
        //   await saveMessage(conversationId, "ai", aiText.trim());
        //   console.log("AI message saved to DB");
        // }
      } catch (error) {
        console.error("Error processing AI response stream:", error);
        await writer.abort(error);
      }
    })();

    // Return the stream to the client
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
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