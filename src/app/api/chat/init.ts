import { start } from "repl";
import supabase from "./utils/supabase";

export async function POST(req: Request) {
    const { user_id } = await req.json();
    const { data, error } = await supabase.from("conversations").insert([{
        user_id: user_id,
        started_at: new Date(),
    },

]).select("id").single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ conversation_id: data.id }));
}