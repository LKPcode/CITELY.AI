import { ref } from 'vue'

const chat_content = ref<any>(null)

export default function useChatContentStore() {

    const initChatContent = (content: string) => {
        chat_content.value = content
    }

    return {
        chat_content,
     
    }
}