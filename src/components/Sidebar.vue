<template>
    <div class=" w-[300px] min-w-[300px] h-full
     overflow-hidden border-r  border-grayer   
    transition-all ease-in-out duration-500 
    "
    :class="{'ml-[-300px]': !showSidebar}"
    >
        <div class="flex flex-col h-full">

        <!-- SIDEBAR HEADER -->
        <div class="h-[70px] p-3 flex items-center bg-white  border-b border-grayer">
            <div @click="createNewChat"
             class="grow flex items-center p-2 mr-4 text-center bg-lightgray hover:bg-cyan-200 rounded-xl cursor-pointer">
                <img src="../components/icons/NewChat.svg" class="w-8 ml-2" alt="Add Paper">
                <div class="text-center grow font-bold ">
                    New Chat
                </div>
            </div>

            <div @click="showSidebar=!showSidebar" class="bg-lightgray rounded-xl p-2 cursor-pointer ">
                <img src="../components/icons/Sidebar.svg" class="w-8" alt="">
            </div>

            <div
             v-if="!showSidebar"
             @click="showSidebar=!showSidebar" 
             class="bg-lightgray opacity-1 rounded-xl p-2 cursor-pointer absolute z-40 left-2 border border-gray-600">
                <img src="../components/icons/Sidebar.svg" class="w-8" alt="">
            </div>

            
        </div>

        <!-- SIDEBAR BODY -->

        <div class="grow px-3 overflow-auto">
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
    console.log("Create new chat")
    let new_chat = await chat_api.createChat({
        name: `Chat ${chat_store.chat_list.value.length + 1}`, 
        workspace_id: workspace_id as string
    })
    chat_store.addChat(new_chat)
    router.push({name: "MainBar", params: { chat_id: new_chat.id }})
}


const goToLibrary = () => {
  let current_workspace = route.params.workspace_id; 
  router.push(`/workspace/${current_workspace}/library`);
};

</script>


