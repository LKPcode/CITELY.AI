<template>
    <div class="h-full grow flex flex-col ">

        <HeaderBar :pages="[{name: 'Home', routename:'HomeView'},
                            {name:'Workspace', routename:'WorkspaceView'},
                            {name:'Chat',  routename:'MainBar'}]" 
                            :title="chat_store.selected_chat.value ? chat_store.selected_chat.value.name :'' ">
        </HeaderBar>

        <!-- MainBar Body -->
        <div class="flex grow overflow-auto">
            <div>
                <Sidebar />
            </div>
            <Chat v-if="chat_store.chat_list.value.length > 0"/>
            <EmptyMainBar v-else />

        </div>

    </div>
</template>

<script setup lang="ts">
import Chat from './Chat.vue'
import HeaderBar from '../../components/HeaderBar.vue';
import Sidebar from '../../components/Sidebar.vue';
import EmptyMainBar from '../EmptyMainBar.vue';
import useChatStore from '../../store/chatStore';

const chat_store = useChatStore();

</script>