import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { createGroq } from "@ai-sdk/groq";
import { CoreMessage, streamText } from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
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

  //  Checking if session exists or create a new one if none provided
  let currentSessionId = sessionId;
  
  if (!currentSessionId || currentSessionId === "") {
    // Create a new session if none was provided
    const { data: newSession, error: createError } = await supabase
      .from("chat_sessions")
      .insert({ user_id: userId, title: `Chat with Neon` })
      .select()
      .single();

    if (createError || !newSession) {
      console.error("❌ Failed to create new session:", createError);
      return new Response("Could not create new session", { status: 500 });
    }

    currentSessionId = newSession.id;
    console.log("Created new session:", currentSessionId);
  } else {
    // Verify the session exists
    const { data: existingSession, error: sessionCheckError } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("id", currentSessionId)
      .single();

    if (sessionCheckError || !existingSession) {
      console.error("Session not found, creating new one");
      const { data: newSession, error: createError } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: `Chat with Neon` })
        .select()
        .single();

      if (createError || !newSession) {
        console.error("Failed to create fallback session:", createError);
        return new Response("Could not create fallback session", { status: 500 });
      }

      currentSessionId = newSession.id;
    }
  }

  //  Saves user message
  const lastUserMessage = messages.filter((m) => m.role === "user").pop();
  if (lastUserMessage) {
    const { error: userMsgError } = await supabase.from("chat_messages").insert({
      session_id: currentSessionId,
      user_id: userId,
      role: "user",
      content: lastUserMessage.content,
    });

    if (userMsgError) {
      console.error("❌ Failed to insert user message:", userMsgError);
    }
  }

  //  Gets AI response and stream
  const result = await streamText({
    model: groq("llama-3.1-8b-instant"),
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

  const stream = result.toDataStream();
  const reader = stream.getReader();
  const encoder = new TextEncoder();
  let aiText = "";

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      aiText += chunk;
      await writer.write(encoder.encode(chunk));
    }

    await writer.close();

    // save ai message to supabase
    const { error: aiMsgError } = await supabase.from("chat_messages").insert({
      session_id: currentSessionId,
      user_id: userId,
      role: "ai",
      content: aiText.trim(),
    });

    if (aiMsgError) {
      console.error("Failed to insert AI message:", aiMsgError);
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain",
      "x-session-id": currentSessionId,
    },
  });
}