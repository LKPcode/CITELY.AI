import { ref } from 'vue'
import { Chat } from '../types';
import { useRouter } from 'vue-router';

const chat_list = ref<Chat[]>([])

const selected_chat = ref<Chat | null>(null)

const showDeleteChatModal = ref(false)

export default function useChatStore() {
  const router = useRouter()

  const initChatList = (chats: Chat[]) => {
    chat_list.value = chats
  }

  const addChat = (chat: Chat) => {
    chat_list.value.unshift(chat)
  }

  const selectChat = (chat: Chat) => {
    selected_chat.value = chat
    // router.push({name: 'MainBar', params: {chat_id: chat.id}})
  }

  const clearChat = () => {
    selected_chat.value = null
    initChatList([])
  }

  const removeChat = (chat_id: string) => {
    chat_list.value = chat_list.value.filter(chat => chat.id != chat_id)
    if (selected_chat.value?.id == chat_id) {
      selected_chat.value = null;
    }
  }


  return {
    chat_list,
    selected_chat,
    initChatList,
    addChat,
    selectChat,
    clearChat,
    showDeleteChatModal,
    removeChat
  }
}
