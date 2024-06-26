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

const deleteChat = async (chat_id: string) => {
  const { data, error } = await supabase.from('chat')
    .delete()
    .match({ id: chat_id })
    .select();
  
  if (error) {
    throw error;
  }
  
  return data as Chat;
}

const getConversationOfChat = async (chat_id: string) => {
  const { data, error } = await supabase.from('chat')
    .select('conversation')
    .eq('id', chat_id).single();
  
  if (error) {
    throw error;
  }
  
  return data;
}

const updateConversationOfChat = async (chat_id: string, conversation: string) => {
  const { data, error } = await supabase.from('chat')
    .update({ conversation })
    .eq('id', chat_id)
    .select('conversation');
  
  if (error) {
    throw error;
  }
  
  return data;
}



export default {
    getChatsOfWorkspace,
    createChat,
    deleteChat,
    getConversationOfChat,
    updateConversationOfChat
}
