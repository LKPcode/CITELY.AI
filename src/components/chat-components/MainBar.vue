<template>
    <div class="h-full w-[calc(100vw-400px)] grow flex flex-col ">

        <HeaderBar :pages="[{name: 'Home', routename:'HomeView'},
                            {name:'Workspace', routename:'WorkspaceView'},
                            {name:'Chat',  routename:'MainBar'}]" 
                            :title="chat_store.selected_chat.value ? chat_store.selected_chat.value.name :'Select a chat to get started' ">

            <div v-if="workspace" class="flex flex-col items-end mr-4 gap-1 text-right">
                <span class="text-xs text-grayest" >{{ workspace?.paper_num  }} Papers</span>
                <span v-if="chat_store.selected_chat.value" class="text-xs text-grayest" > Created {{ formatDateRelativeToCurrent(chat_store.selected_chat.value?.created_at) }} </span>
                <span v-else class="text-xs text-grayest"> - </span>
            </div>


        </HeaderBar>

        <!-- MainBar Body -->
        <div class="flex grow overflow-hidden">
            <div class="flex-shrink-0">
                <Sidebar />
            </div>
            <div class="h-full flex-1 overflow-hidden relative">

                <Chat v-if="chat_store.chat_list.value.length > 0"/>
            </div>
            <!-- <EmptyMainBar v-else /> -->

        </div>

    </div>
</template>

<script setup lang="ts">
import Chat from './Chat.vue'
import HeaderBar from '../../components/HeaderBar.vue';
import Sidebar from '../../components/Sidebar.vue';
import EmptyMainBar from '../EmptyMainBar.vue';
import useChatStore from '../../store/chatStore';
import workspaces_api from '../../api/workspaces_api';
import { Workspace } from '../../types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import formatDateRelativeToCurrent from "../../helper_functions/datetime"
import useWorkspaceStore from '../../store/workspaceStore';

const chat_store = useChatStore();

const {selected_workspace} = useWorkspaceStore();

const workspace = ref<Workspace | null>(null);


const route = useRoute();
onMounted(async () => {
    const workspace_id = route.params.workspace_id;
    if (workspace_id) {
        workspace.value = await workspaces_api.getWorkspace(workspace_id as string);
        selected_workspace.value = workspace.value;
    }
})

</script>