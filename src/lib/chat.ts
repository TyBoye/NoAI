// import { supabase } from "./supabase"; // Commented out - Supabase disabled

// Get or create Supabase user ID from Clerk user ID
export async function getOrCreateUser(clerkUserId: string) {
  // Commented out - Supabase disabled
  // const { data } = await supabase
  //   .from("users")
  //   .select("id")
  //   .eq("clerk_user_id", clerkUserId)
  //   .single();
  // if (data) return data.id;
  // const { data: newUser, error: insertError } = await supabase
  //   .from("users")
  //   .insert([{ clerk_user_id: clerkUserId, name, email }])
  //   .select()
  //   .single();
  // if (insertError) throw insertError;
  // return newUser.id;
  
  return `user-${clerkUserId}`;
}

// Get or start a conversation
export async function getOrCreateConversation() {
  // Commented out - Supabase disabled
  // const { data } = await supabase
  //   .from("conversations")
  //   .select("id")
  //   .eq("user_id", userId)
  //   .is("ended_at", null)
  //   .order("started_at", { ascending: false })
  //   .limit(1)
  //   .single();
  // if (data) return data.id;
  // const { data: newConv, error: newError } = await supabase
  //   .from("conversations")
  //   .insert([{ user_id: userId, title }])
  //   .select()
  //   .single();
  // if (newError) throw newError;
  // return newConv.id;
  
  return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Save a single message
export async function saveMessage() {
  // Commented out - Supabase disabled
  // const { error } = await supabase.from("messages").insert([
  //   {
  //     conversation_id: conversationId,
  //     sender,
  //     content,
  //   },
  // ]);
  // if (error) throw error;
}

// Get recent conversations for a user
export async function getRecentConversations() {
  // Commented out - Supabase disabled
  // const { data, error } = await supabase
  //   .from("conversations")
  //   .select("*")
  //   .eq("user_id", userId)
  //   .order("started_at", { ascending: false })
  //   .limit(10);
  // if (error) throw error;
  // return data;
  
  return [];
}

// Get messages for a conversation
export async function getMessages() {
  // Commented out - Supabase disabled
  // const { data, error } = await supabase
  //   .from("messages")
  //   .select("*")
  //   .eq("conversation_id", conversationId)
  //   .order("created_at", { ascending: true });
  // if (error) throw error;
  // return data;
  
  return [];
}
