<template>
    <!-- CHATS -->
    
        <!-- <div class="uppercase mt-4 text-center font-bold text-sm text-slate-600 my-2">
            CHATS
        </div> -->
        <div class="h-full py-3">

            <TransitionGroup name="list-complete" tag="div" class="flex flex-col" >
                <div v-for="chat in chat_store.chat_list.value" :key="chat.id"  class="relative list-complete-item">
                    <RouterLink 
                        :to="{name: 'MainBar', params: { chat_id: chat.id}}"
                        class=" flex items-center p-1 rounded-xl cursor-pointer"
                        :class="[chat.id == selected_chat?.id ? 'bg-gray-50  dark:bg-darker text-accent' : 'hover:bg-gray-50  dark:hover:bg-darker']" >
                        <!-- <img src="../../components/icons/Chat.svg" class="w-7 ml-2 stroke-accent" alt="Chat Icon"> -->

                        <svg class="w-7 ml-2 "
                        :class="[chat.id == selected_chat?.id ? 'stroke-accent' : 'stroke-gray-800']"
                             width="35" height="35" viewBox="0 0 35 35"  fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.1666 13.8334C29.1666 10.0621 29.1666 8.17649 27.995 7.00492C26.8234 5.83334 24.9378 5.83334 21.1666 5.83334H13.8333C10.062 5.83334 8.1764 5.83334 7.00482 7.00492C5.83325 8.17649 5.83325 10.0621 5.83325 13.8333V27.1667C5.83325 28.1095 5.83325 28.5809 6.12615 28.8738C6.41904 29.1667 6.89044 29.1667 7.83325 29.1667H21.1666C24.9378 29.1667 26.8234 29.1667 27.995 27.9951C29.1666 26.8235 29.1666 24.9379 29.1666 21.1667V13.8334Z"  stroke-width="3"/>
                            <path d="M13.125 14.5833L21.875 14.5833"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.125 20.4167H17.5"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <div class="ml-4 text-sm font-semibold  dark:text-white">
                            {{ chat.name }}
                        </div>
                        
                    </RouterLink>
                    <TrashIcon v-if="chat.id == selected_chat?.id" 
                                    @click="deleteChat()"
                                    class="ml-auto absolute right-3 top-2 cursor-pointer stroke-gray-400 hover:stroke-accent" />
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
        // chat_store.selectChat(null)
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
            // goToChat(chat_store.chat_list.value[0])
        }
    }
    else{
        // Select first chat
        // chat_store.selected_chat.value = null
        if(chat_store.chat_list.value.length > 0){
            goToChat(chat_store.chat_list.value[0])
        }else{
            let new_chat = await chat_api.createChat({ name: "Chat 1", workspace_id: workspace_id })  
            chat_store.addChat(new_chat)      
            goToChat(new_chat)                          
        }
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