<template>
    <!-- CHATS -->
    
        <!-- <div class="uppercase mt-4 text-center font-bold text-sm text-slate-600 my-2">
            CHATS
        </div> -->
        <div class="h-full py-3">

            <TransitionGroup name="list-complete" tag="div" class="flex flex-col" >
                <div v-for="chat in chat_store.chat_list.value" :key="chat.id" class="list-complete-item flex items-center p-2 rounded-xl cursor-pointer"
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

.list-complete-item {
    transition: transform 0.7s, opacity 0.7s, margin 0.7s 0.3s;
  /* margin-right: 10px; */
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-300px);
  margin-bottom: -45px;
}
.list-complete-leave-active {
  /* position: absolute; */
}

</style>