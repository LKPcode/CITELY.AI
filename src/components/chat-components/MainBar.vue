<template>
    <div class="h-full grow flex flex-col relative">

        <!-- MainBar HEADER -->
        <div class="h-[70px] min-h-[70px] bg-white  border-b border-grayer">
            <div class="h-[3px] bg-accent"></div>

            <div class="flex">

            <!-- Sidebar Toggle -->
            <div v-show="showSidebar==false"
                @click="showSidebar=!showSidebar"
                class="bg-lightgray rounded-xl p-2 m-2 cursor-pointer">
                <img src="../../components/icons/Sidebar.svg" class="w-8" alt="">

            </div>

            <div class="mx-4 mt-2.5">
                <div class="  font-bold">
                    {{ selected_workspace?.name }}
                    <span  class="text-xs ml-2 underline text-grayest font-normal"> {{ selected_workspace?.paper_num }} Papers</span>
                </div>
                <div class="text-grayest text-sm ">
                    {{ selected_chat?.name }}
                </div>
           </div>
        </div>
        </div>

        <!-- MainBar Body -->

        <Chat/>


        <div class="mt-20"></div>

        <div class=" w-full absolute bottom-0 flex justify-center bg-zinc-50">
            <div class="my-4 w-[80%] max-w-[800px] relative">
                <textarea class="w-full p-3 rounded-xl bg-lightgray shadow-md border border-grayer min-h-[50px] h-[0px] max-h-[200px]"
                    oninput="this.style.height = ''; this.style.height = this.scrollHeight +'px'"  name="" id=""></textarea>
                <img class="cursor-pointer absolute bottom-1 right-2 w-12" src="../../components/icons/Send.svg" alt="">
            </div>
        </div>



    </div>
</template>

<script setup lang="ts">
import Chat from './Chat.vue'
import { sidebarStore } from '../../store/sidebarStore';
import workspaceStore from '../../store/workspaceStore';
import useChatStore from '../../store/chatStore';

const {selected_workspace} = workspaceStore();
const {selected_chat} = useChatStore();

const {showSidebar} = sidebarStore();


</script>