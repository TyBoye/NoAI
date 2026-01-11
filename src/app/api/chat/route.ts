import { NextRequest } from "next/server";
// import { supabase } from "@/lib/supabase"; // Commented out - Supabase disabled
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

interface CoreMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const {
    messages,
    data,
  }: {
    messages: CoreMessage[];
    data: {
      firstName: string;
      lastName: string;
      sessionId: string;
      userId: string;
    };
  } = await req.json();

  const { firstName, lastName, sessionId, userId } = data;

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  //  Supabase disabled - using simple session ID
  const currentSessionId = sessionId || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Commented out - Supabase session management
  // if (!currentSessionId || currentSessionId === "") {
  //   const { data: newSession, error: createError } = await supabase
  //     .from("chat_sessions")
  //     .insert({ user_id: userId, title: `Chat with Neon` })
  //     .select()
  //     .single();
  //   if (createError || !newSession) {
  //     console.error("❌ Failed to create new session:", createError);
  //     return new Response("Could not create new session", { status: 500 });
  //   }
  //   currentSessionId = newSession.id;
  // }

  // Commented out - Supabase message saving
  // const lastUserMessage = messages.filter((m) => m.role === "user").pop();
  // if (lastUserMessage) {
  //   const { error: userMsgError } = await supabase.from("chat_messages").insert({
  //     session_id: currentSessionId,
  //     user_id: userId,
  //     role: "user",
  //     content: lastUserMessage.content,
  //   });
  //   if (userMsgError) {
  //     console.error("❌ Failed to insert user message:", userMsgError);
  //   }
  // }

  //  Gets AI response and stream
  const result = streamText({
    model: openai("gpt-4o-mini"), // You can change this to "gpt-4", "gpt-3.5-turbo", or "gpt-4o" as needed
    messages,
    system: `Your name is Neon, a highly skilled, human-like negotiation coach.
    You help users improve their negotiation strategies by:
    - Evaluating their negotiation performance (mock or real).
    - Offering short, constructive feedback.
    - Providing actionable and easy-to-apply tips.


    Speak in a confident, friendly, and supportive tone like a real person named Neon.
    Keep all responses under 3 sentences unless the user asks for more detail.
    Always bring the conversation back to negotiation if it goes off-topic.


    At the end of each session:
    1. Give a brutal performance rating from 1 to 10.
    2. Explain the rating briefly.
    3. Offer 1–2 areas for improvement.
    4. Personally thank the user by name: ${firstName} ${lastName}.
    5. Ask them to rate your support.


    Never respond to questions unrelated to negotiation — politely redirect.


    Begin each session by asking:
    "Hey ${firstName} ${lastName}, what brings you here today? Are you looking to improve your negotiation skills or work through a specific challenge?"
  `.trim()
  });

  // Get the text stream and process it
  const stream = result.textStream;
  const reader = stream.getReader();
  const encoder = new TextEncoder();

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  (async () => {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // textStream returns strings directly, not Uint8Array
        const chunk = typeof value === 'string' ? value : new TextDecoder().decode(value);
        await writer.write(encoder.encode(chunk));
      }

      await writer.close();

      // Commented out - Supabase message saving
      // const aiText = ""; // Would accumulate here if saving to DB
      // if (aiText.trim()) {
      //   const { error: aiMsgError } = await supabase.from("chat_messages").insert({
      //     session_id: currentSessionId,
      //     user_id: userId,
      //     role: "ai",
      //     content: aiText.trim(),
      //   });
      //   if (aiMsgError) {
      //     console.error("Failed to insert AI message:", aiMsgError);
      //   } else {
      //     console.log("AI message saved to DB");
      //   }
      // }
    } catch (error) {
      console.error("Error processing stream:", error);
      await writer.abort(error);
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "x-session-id": currentSessionId,
    },
  });
}