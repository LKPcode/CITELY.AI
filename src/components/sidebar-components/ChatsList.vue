<template>
    <!-- CHATS -->
    
        <!-- <div class="uppercase mt-4 text-center font-bold text-sm text-slate-600 my-2">
            CHATS
        </div> -->
        <div class="h-full py-3">

            <TransitionGroup name="enter" >
                <div v-for="chat in chat_store.chat_list.value" :key="chat.id" class="flex items-center p-2 rounded-xl cursor-pointer"
                    :class="[chat.id == selected_chat?.id ? 'bg-lightgray' : 'hover:bg-zinc-100']" @click="goToChat(chat)">
                    <img src="../../components/icons/Chat.svg" class="w-7 ml-2" alt="Chat Icon">
                    <div class="ml-4 text-sm font-semibold">
                        {{ chat.name }}
                    </div>
                    <TrashIcon v-if="chat.id == selected_chat?.id" 
                                @click.stop="deleteChat()"
                                class="ml-auto hover:stroke-accent" />
                </div>
            </TransitionGroup>

        </div>


    
</template>


<script lang="ts" setup>
import { onMounted, watch } from "vue";
import useChatStore from "../../store/chatStore"
import chat_api from "../../api/chats_api"
import { useRoute, useRouter } from "vue-router"
import TrashIcon from "../icons/TrashIcon.vue";

const chat_store = useChatStore()

let { selected_chat } = chat_store

const route = useRoute()
const router = useRouter()


let workspace_id = route.params.workspace_id as string

// Refresh chats when chat id changes
watch(() => route.params.chat_id, async () => {
    let chat_id = route.params.chat_id as string
    console.log("Chat id changed, refreshing chats", chat_id, route.params.chat_id)
    let chat = chat_store.chat_list.value.find((chat:any) => chat.id == chat_id)
    if (chat) {
        chat_store.selectChat(chat)
    }else{
        // Select first chat
        // goToChat(chat_store.chat_list.value[0])
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
            chat_store.selectChat(chat)
        }else{
            // Select first chat
            goToChat(chat_store.chat_list.value[0])
        }
    }
    else{
        // Select first chat
        // goToChat(chat_store.chat_list.value[0])
    }
}


// Delete chat
const deleteChat = async () => {
    chat_store.showDeleteChatModal.value = true
}


// Go to chat
const goToChat = (chat:any) => {
    router.push({name: "MainBar", params: { chat_id: chat.id}})
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