<template>
    <!-- CHATS -->
    <div class="h-3/5 flex flex-col">
        <div class="uppercase mt-4 text-center font-bold text-sm text-slate-600 my-2">
            CHATS
        </div>
        <div class="grow overflow-auto hide-scrollbar">

            <TransitionGroup name="enter" >
                <div v-for="chat in chat_store.chat_list.value" :key="chat.id" class="flex items-center p-2 rounded-xl cursor-pointer"
                    :class="[chat.id == selected_chat?.id ? 'bg-lightgray' : 'hover:bg-zinc-100']" @click="selectChat(chat)">
                    <img src="../../components/icons/Chat.svg" class="w-7 ml-2" alt="Chat Icon">
                    <div class="ml-4 text-sm font-semibold">
                        {{ chat.name }}
                    </div>
                </div>
            </TransitionGroup>

        </div>

        <div @click="createNewChat"
             class="flex items-center p-2 bg-cyan-50 hover:bg-cyan-100  rounded-xl cursor-pointer">
            <img src="../../components/icons/NewChat.svg" class="w-7 ml-2" alt="Add Paper">
            <div class="ml-4 text-sm grow font-bold">
                New Chat
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, watch } from "vue";
import useChatStore from "../../store/chatStore"
import chat_api from "../../api/chats_api"
import { useRoute } from "vue-router"

const chat_store = useChatStore()

let { selected_chat } = chat_store


const route = useRoute()
let workspace_id = route.params.workspace_id as string

// Refresh chats when workspace id changes
watch(() => route.params.workspace_id, async () => {
    workspace_id = route.params.workspace_id as string
    console.log("Workspace id changed, refreshing chats", workspace_id)
    await refreshChats(workspace_id)
})

// Refresh chats when chat id changes
watch(() => route.params.chat_id, async () => {
    let chat_id = route.params.chat_id as string
    console.log("Chat id changed, refreshing chats", chat_id, route.params.chat_id)
    let chat = chat_store.chat_list.value.find((chat:any) => chat.id == chat_id)
    if (chat) {
        selectChat(chat)
    }else{
        // Select first chat
        selectChat(chat_store.chat_list.value[0])
    }
})


// Get chats on mount
onMounted( async () => {
    await refreshChats(workspace_id)
})

const refreshChats = async (workspace_id:string) => {
    let temp_chats = await chat_api.getChatsOfWorkspace(workspace_id)
    chat_store.initChatList(temp_chats)
    // route = useRoute()
    let current_chat = route.params.chat_id as string;
    if (current_chat) {
        let chat = chat_store.chat_list.value.find((chat:any) => chat.id == current_chat)
        if (chat) {
            selectChat(chat)
        }else{
            // Select first chat
            selectChat(chat_store.chat_list.value[0])
        }
    }
}

// Create new chat
const createNewChat = async () => {
    console.log("Create new chat")
    let new_chat = await chat_api.createChat({
        name: `Chat ${chat_store.chat_list.value.length + 1}`, 
        workspace_id: workspace_id
    })
    chat_store.addChat(new_chat)
    selectChat(new_chat)
}


// Select chat
const selectChat = (chat:any) => {
    chat_store.selectChat(chat)
}
</script>


<style scoped>

.enter-enter-active,
.enter-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
  /* top to bottom */
}

.enter-enter-from,
.enter-leave-to {
  opacity: 0;
  transition: opacity 0s ease, transform 0s ease;
}


</style>