<template>
    <div class="h-full grow flex flex-col">
        
    <div class=" grow overflow-auto relative flex flex-col-reverse">
        
        <div class="grow flex flex-col">

            
            <!-- ONE BACK AND FORTH -->
            <div v-if="conversation == null" class="grow  flex flex-col justify-center items-center">
                <img class="w-6 animate-spin" src="../../components/icons/Loading.svg" alt="">
                <span class="text-grayest text-sm mt-2">
                    Loading Chat
                </span>
            </div>
            <EmptyChat v-else-if="conversation.length == 0" />
            <div v-else v-for="convo in conversation" class="flex flex-col-reverse w-full ">

                <UserQuery v-if="convo.author == 'user'" :text="(convo.text as string)" />
                <AgentResponse v-if="convo.author == 'AI'" :content="convo.content" :key="convo.content" />
            </div>

            <div class="h-10"></div>

        </div>

    </div>
    
    <ChatTextarea class=" bottom-0" @sendQuery="sendQuery" :key="chat_id" />
</div>

</template>

<script setup lang="ts">
import UserQuery from './UserQuery.vue';
import AgentResponse from './AgentResponse.vue';
import EmptyChat from './EmptyChat.vue';

import chats_api from '../../api/chats_api';

// import chat_ from "./api_spec.json";
import useSourcesStore from '../../store/sourcesStore';
const sources_store = useSourcesStore();
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ChatTextarea from './ChatTextarea.vue';
import useChatStore from '../../store/chatStore';
const chat_store = useChatStore();

// let loading = ref(false);

let conversation = ref<any>(null);
let chat_id: any = null

const route = useRoute();
watch(() => route.params.chat_id, async (newVal) => {
    chat_id = newVal;
    if (chat_id) await loadConversation(chat_id as string);
});


onMounted(async () => {
    let chat_id = route.params.chat_id;
    if (chat_id) await loadConversation(chat_id as string);
});

const loadConversation = async (chat_id: string) => {
    try {
        conversation.value = null;
        sources_store.initSourceList([]);
        let res = await chats_api.getConversationOfChat(chat_id as string);
        conversation.value = res.conversation;
        if (res.conversation.length > 0 && res.conversation[1].sources) {
            sources_store.initSourceList(res.conversation[1].sources as any);
        }

        console.log(conversation.value);
    } catch (e) {
        console.log(e);
    }
}


const sendQuery = (query: string) => {

    let new_query = query.trim();

    conversation.value.push({
        "id": 1,
        "convo_id": 1,
        "author": "user",
        "text": new_query
    })

    conversation.value.push({
        "id": 1,
        "convo_id": 1,
        "author": "AI",
        "content": [
            {
                "type": "answer",
                "text": ""
            }
        ]
    })

    const postData = {
        conversation_id: "conversation" + route.params.chat_id,
        message: new_query
    };

    const url = "http://localhost:8000/chat";

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'text/event-stream',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Assuming you want to read the response as a stream
            const reader = response.body.getReader();

            // Define a function to handle incoming chunks

            async function readStream() {

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log("Stream done.");
                        chats_api.updateConversationOfChat(route.params.chat_id as string, conversation.value)
                        chat_store.updateChatConversation(route.params.chat_id as string, conversation.value)
                        break;
                    }

                    // Create a TextDecoder instance
                    const textDecoder = new TextDecoder();

                    // Convert Uint8Array to text
                    const text = textDecoder.decode(value);
                    // Handle the received chunk as needed
                    let index = conversation.value.length - 1;

                    conversation.value[index].content[0].text += text;

                }
            }


            // Start reading the stream
            readStream();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


</script>
