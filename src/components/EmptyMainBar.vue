<template>
    <div class="grow flex flex-col">


        <!-- MainBar Body -->
        <div class="text-center grow flex flex-col justify-center">
            <svg class="mx-auto h-12 w-12 text-gray-400 mt-[-200px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true">
                <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-gray-900">No Chats</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new chat for this workspace.</p>
            <div class="mt-6">
                <button @click="createNewChat" type="button"
                    class="inline-flex items-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90">
                    <!-- <img src="../components/icons/NewChat.svg" fill="#fff" alt=""> -->
                    Create Chat
                </button>
            </div>
        </div>




    </div>
</template>

<script setup lang="ts">

import chat_api from '../api/chats_api';
import useChatStore from '../store/chatStore';
import { useRouter, useRoute } from 'vue-router';



const chat_store = useChatStore()
const router = useRouter()
const route = useRoute()
// Create new chat
const createNewChat = async () => {
    let workspace_id = route.params.workspace_id as string
    console.log("Create new chat")
    let new_chat = await chat_api.createChat({
        name: `Chat ${chat_store.chat_list.value.length + 1}`, 
        workspace_id: workspace_id
    })
    chat_store.addChat(new_chat)
    goToChat(new_chat)
}

const goToChat = (chat:any) => {
    router.push({name: "MainBar", params: { chat_id: chat.id}})
}

</script>