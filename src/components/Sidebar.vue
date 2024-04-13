<template>
    <div class=" w-[300px] min-w-[300px] h-full
     overflow-hidden border-r  border-grayer   
    transition-all ease-in-out duration-500 
    bg-white  dark:bg-dark
    "
    :class="{'ml-[-300px]': !showSidebar}"
    >
        <div class="flex flex-col h-full">

        <!-- SIDEBAR HEADER -->
        <div class="h-[70px] p-3 flex items-center bg-white  dark:bg-dark  border-b border-grayer">
            <div @click="createNewChat"
             class="grow flex items-center p-2 mr-4 text-center bg-gray-50  dark:bg-dark hover:bg-gray-100  dark:hover:bg-darker border border-gray-100 hover:border-accent  rounded-xl cursor-pointer">
                <img src="../components/icons/NewChat.svg" class="w-8 ml-2" alt="Add Paper">
                <div class="text-center grow font-bold dark:text-white ">
                    New Chat
                </div>
            </div>

            <div @click="showSidebar=!showSidebar" class="bg-gray-50  dark:bg-dark border border-gray-100 hover:border-accent rounded-xl p-3 cursor-pointer ">
                <img src="../components/icons/Sidebar.svg" class="w-6" alt="">
            </div>

            <div
             v-if="!showSidebar"
            
             class="absolute z-40 top-20  left-2">

                <div  @click="showSidebar=!showSidebar" 
                 class="hover:bg-gray-100 dark:hover:bg-darker opacity-1 rounded-xl p-3 cursor-pointer border border-gray-100/0  hover:border-accent">
                    <img src="../components/icons/Sidebar.svg" class="w-6" alt="">
                </div>

                <div  @click="createNewChat" 
                 class="mt-2 hover:bg-gray-100 dark:hover:bg-darker opacity-1 rounded-xl p-2 cursor-pointer border border-gray-100/0  hover:border-accent">
                    <img src="../components/icons/NewChat.svg" class="w-8" alt="Add Paper">

                </div>


                
            </div>



            
        </div>

        <!-- SIDEBAR BODY -->

        <div class="grow px-3 overflow-auto show-scrollbar-on-hover">
                <!-- Chats -->
                <ChatsList />
        </div>


       <SettingsMenu/>

    </div>
</div>
</template>

<script setup lang="ts">

import ChatsList from "./sidebar-components/ChatsList.vue";

import {sidebarStore} from "../store/sidebarStore";
import { useRouter, useRoute } from "vue-router";
import SettingsMenu from "./SettingsMenu.vue";
import useChatStore from "../store/chatStore";
import chat_api from "../api/chats_api";

const {showSidebar} = sidebarStore();

const router = useRouter();
const route = useRoute();


// Create new chat
const chat_store = useChatStore();
const workspace_id = route.params.workspace_id;
const createNewChat = async () => {
    let empty_chat = chat_store.chat_list.value.find((chat:any) => chat.conversation.length == 0 )
    if (empty_chat) {
        router.push({name: "MainBar", params: { chat_id: empty_chat.id }})
        return
    }
    console.log("Create new chat")
    let new_chat = await chat_api.createChat({
        name: `Chat ${chat_store.chat_list.value.length + 1}`, 
        workspace_id: workspace_id as string
    })
    chat_store.addChat(new_chat)
    router.push({name: "MainBar", params: { chat_id: new_chat.id }})
}


</script>


