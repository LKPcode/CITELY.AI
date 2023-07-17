<template>
    <div class=" w-[300px] min-w-[300px] 
    h-screen overflow-hidden border-r  border-grayer   
    transition-all ease-in-out duration-500
    "
    :class="{'ml-[-300px]': !showSidebar}"
    >
        <div class="flex flex-col h-full">

        <!-- SIDEBAR HEADER -->
        <div class="h-[70px] p-4 flex items-center bg-white  border-b border-grayer">
            <div @click="goToLibrary"
             class="grow flex items-center p-2 mr-4 text-center bg-lightgray rounded-xl cursor-pointer">
                <img src="../components/icons/NewChat.svg" class="w-8 ml-2" alt="Add Paper">
                <div class="text-center grow font-bold ">
                    Library
                </div>
            </div>

            <div @click="showSidebar=!showSidebar" class="bg-lightgray rounded-xl p-2 cursor-pointer">
                <img src="../components/icons/Sidebar.svg" class="w-8" alt="">
            </div>
        </div>

        <!-- SIDEBAR BODY -->

        <div class="mx-4 mb-4 grow">

            <!-- Chats -->
            <ChatsList />


            <!-- Workspaces -->
            <WorkspaceList />

        </div>


        <div class="border-t justify-self-end border-grayer p-4">
            <div class="flex items-center">
                <img src="../components/icons/Settings.svg" class="w-6" alt="">
                <div class="font-bold text-sm ml-4">Settings</div>
            </div>

        </div>

        





    </div>
</div>
</template>

<script setup lang="ts">
import WorkspaceList from "./sidebar-components/WorkspaceList.vue";
import ChatsList from "./sidebar-components/ChatsList.vue";

import {sidebarStore} from "../store/sidebarStore";
import { useRouter, useRoute } from "vue-router";


const {showSidebar} = sidebarStore();

const router = useRouter();
const route = useRoute();
const goToLibrary = () => {
  let current_workspace = route.params.workspace_id; 
  router.push(`/workspace/${current_workspace}/library`);
};

</script>


