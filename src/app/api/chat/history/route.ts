import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const { data: sessions, error } = await supabase
    .from("chat_sessions")
    .select("id, title, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch sessions:", error);
    return new Response("Database error", { status: 500 });
  }

  return Response.json({ sessions });
}
