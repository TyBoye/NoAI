import { supabase } from './supabase';

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  messages: string;
  created_at: string;
}

export async function saveChat(userId: string, messages: string, title?: string) {
  const { data, error } = await supabase
    .from('chats')
    .insert([
      {
        user_id: userId,
        title: title || 'New Chat',
        messages: messages,
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentChats(userId: string) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

export async function getChatById(chatId: string) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('id', chatId)
    .single();

  if (error) throw error;
  return data;
} 