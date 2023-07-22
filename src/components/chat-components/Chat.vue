<template>
    <div class="grow overflow-auto relative">


        <!-- ONE BACK AND FORTH -->
        <div v-for="convo in chat" >

            <UserQuery v-if="convo.author=='user'" :text="convo.text" />
            <AgentResponse v-if="convo.author=='AI'" :content="convo.content"  />

        </div>



    </div>
</template>

<script setup lang="ts">
import UserQuery from './UserQuery.vue';
import AgentResponse from './AgentResponse.vue';
import chat from "./api_spec.json"
import useSourcesStore from '../../store/sourcesStore';
const  sources_store = useSourcesStore();

sources_store.initSourceList(chat[1].sources as any);





</script>