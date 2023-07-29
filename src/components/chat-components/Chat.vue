<template>
    <div class="h-full grow overflow-auto relative flex flex-col">


        <!-- ONE BACK AND FORTH -->
        <div
                v-for="convo in chat" >
                <UserQuery v-if="convo.author=='user'" :text="(convo.text as string)" />
                <AgentResponse v-if="convo.author=='AI'" :content="convo.content"  />
        </div>
        <!-- <div
            class="grow flex flex-col justify-center items-center">
            <img  class="w-6 animate-spin" src="../../components/icons/Loading.svg" alt="">
            <span class="text-grayest text-sm mt-2">
                    Loading Chat
            </span>
        </div> -->

        <div class="mt-20"></div>

        <div class=" w-full sticky bottom-0 flex justify-center bg-zinc-50">
            <div class="my-4 w-[80%] max-w-[800px] relative">
                <textarea class="w-full p-3 rounded-xl bg-lightgray shadow-md border border-grayer min-h-[50px] h-[0px] max-h-[200px]"
                    oninput="this.style.height = ''; this.style.height = this.scrollHeight +'px'"  name="" id=""></textarea>
                <img class="cursor-pointer absolute bottom-1 right-2 w-12" src="../../components/icons/Send.svg" alt="">
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import UserQuery from './UserQuery.vue';
import AgentResponse from './AgentResponse.vue';
import chat from "./api_spec.json";
import useSourcesStore from '../../store/sourcesStore';
const  sources_store = useSourcesStore();
// import { onMounted, ref } from 'vue';

// let loading = ref(false);

// let chat = ref<any>(null);

sources_store.initSourceList(chat[1].sources as any);
// onMounted(() => {
//     setTimeout(() => {
//         chat.value = chat_;
//         loading.value = false;
//     }, 2000);
// });

</script>