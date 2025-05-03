import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { userId, title = "Chat with Neon" } = await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({ user_id: userId, title })
    .select()
    .single();

  if (error) {
    console.error("Failed to create session:", error);
    return new Response("Error creating session", { status: 500 });
  }

  return Response.json({ sessionId: data.id });
}
