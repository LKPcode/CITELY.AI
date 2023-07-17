import supabase from './supabase_instance';
import { Chat } from '../types';

const getChatsOfWorkspace = async (workspace_id: string): Promise<Chat[]> => {
  const { data, error } = await supabase.from('chat')
    .select('*')
    .eq('workspace_id', workspace_id)
    .order('created_at', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return data as Chat[];
}

const createChat = async (chat: Chat): Promise<Chat> => {
  const { data, error } = await supabase.from('chat')
    .insert(chat)
    .select()
    .single();
  
  if (error) {
    throw error;
  }
  
  return data as Chat;
}

export default {
    getChatsOfWorkspace,
  createChat
}
