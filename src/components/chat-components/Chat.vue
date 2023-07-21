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





</script>