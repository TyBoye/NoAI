import { NextRequest } from "next/server";
// import { supabase } from "@/lib/supabase"; // Commented out - Supabase disabled

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  // const { userId, title = "Chat with Neon" } = await req.json(); // title unused when Supabase disabled

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  // Commented out - Supabase disabled, generating simple session ID
  // const { data, error } = await supabase
  //   .from("chat_sessions")
  //   .insert({ user_id: userId, title })
  //   .select()
  //   .single();
  // if (error) {
  //   console.error("Failed to create session:", error);
  //   return new Response("Error creating session", { status: 500 });
  // }

  const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return Response.json({ sessionId });
}
