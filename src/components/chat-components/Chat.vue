<template>
    <div class="h-full grow overflow-auto relative flex flex-col">

        <!-- ONE BACK AND FORTH -->
        <div v-if="conversation == null"
            class="grow h-full flex flex-col justify-center items-center">
            <img  class="w-6 animate-spin" src="../../components/icons/Loading.svg" alt="">
            <span class="text-grayest text-sm mt-2">
                    Loading Chat
            </span>
        </div>
        <EmptyChat v-else-if="conversation.length == 0"  />
        <div
                v-else
                v-for="convo in conversation" 
                >
                <UserQuery v-if="convo.author=='user'" :text="(convo.text as string)" />
                <AgentResponse v-if="convo.author=='AI'" :content="convo.content" :key="convo.content"  />
        </div>


        <div class="mt-20 grow"></div>

        <div class=" w-full sticky bottom-0 flex justify-center bg-zinc-50">
            <div class="my-4 w-[80%] max-w-[800px] relative">
                <textarea 
                    v-focus
                    v-model="query"
                    class="w-full  border-none focus:ring-accent p-3 rounded-xl bg-lightgray shadow-md border border-grayer min-h-[50px] h-[0px] max-h-[200px]"
                    oninput="this.style.height = ''; this.style.height = this.scrollHeight +'px'"  name="" id=""></textarea>
                    <svg @click="sendQuery"
                         width="56" height="56" class=" fill-accent cursor-pointer absolute bottom-1 right-2 w-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3315 16.9134L18.0997 27.0077C18.3765 27.4922 18.515 27.7345 18.515 28C18.515 28.2656 18.3765 28.5078 18.0997 28.9923L12.3315 39.0867C11.0932 41.2537 10.474 42.3372 10.9569 42.8745C11.4397 43.4118 12.583 42.9116 14.8696 41.9112L42.4786 29.8323C44.2741 29.0468 45.1718 28.654 45.1718 28C45.1718 27.346 44.2741 26.9532 42.4786 26.1677L14.8696 14.0888C12.583 13.0884 11.4397 12.5882 10.9569 13.1255C10.474 13.6628 11.0932 14.7464 12.3315 16.9134Z" />
                    </svg>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import UserQuery from './UserQuery.vue';
import AgentResponse from './AgentResponse.vue';
import EmptyChat from './EmptyChat.vue';

import chats_api from '../../api/chats_api';

// import chat_ from "./api_spec.json";
import useSourcesStore from '../../store/sourcesStore';
const  sources_store = useSourcesStore();
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// let loading = ref(false);

let conversation = ref<any>(null);
let query = ref<string>("");
// let content = ref<any>(null);

// Custom Directive to focus on textarea
const vFocus = {
  mounted: (el:any) => el.focus()
}

const route = useRoute();
watch(() => route.params.chat_id, async (newVal) => {
    let chat_id = newVal;
    if (chat_id) await loadConversation(chat_id as string);
});


onMounted(async () => {
    let chat_id = route.params.chat_id;
    if (chat_id) await loadConversation(chat_id as string);

    // setInterval(() => {
    //     console.log("complete text");
    //     conversation.value[1].content[5].text += "Kalispera "
    // }, 100);
});

const loadConversation = async (chat_id:string) => {
    try{
        conversation.value = null;
        sources_store.initSourceList([]);
        let res = await chats_api.getConversationOfChat(chat_id as string);
        conversation.value = res.conversation;
        if (res.conversation.length>0  && res.conversation[1].sources){
            sources_store.initSourceList(res.conversation[1].sources as any);
        }

        console.log(conversation.value);
    }catch(e){
        console.log(e);
    }
}



const sendQuery = () => {
    console.log(query.value);
    conversation.value.push(  {
        "id": 1,
        "convo_id": 1,
        "author": "user",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies nunc sed, aliquam nisl. Sed euismod, nisl quis aliquet ultricies, nunc nisl aliquam nisl, sed aliquam nisl nisl euismod nisl. Sed euismod, nisl quis aliquet ultricies, nunc nisl aliquam nisl, sed aliquam nisl nisl euismod nisl."
    },)


}

</script>