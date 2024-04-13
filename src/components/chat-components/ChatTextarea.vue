<template>
      <!-- <div class="mt-20 grow"></div> -->

    <div class=" w-full sticky bottom-0 flex justify-center bg-zinc-50 dark:bg-darker">
        <div class="my-4 w-[80%] max-w-[800px] relative">
            <textarea
                @keydown.enter.exact.prevent="sendQuery"
                v-focus 
                ref="textarea"
                v-model="query"
                class="w-full  border-none focus:ring-accent p-3 rounded-xl bg-lightgray dark:bg-dark dark:text-lightgray shadow-md border border-grayer min-h-[50px] h-[0px] max-h-[200px]"
                @input="resizeTextarea" ></textarea>
            <svg @click="sendQuery" width="56" height="56"
                :class="{ 'fill-accent': query.length > 0, 'fill-gray-500': query.length == 0 }"
                class="stroke-2 cursor-pointer absolute bottom-1 right-2 w-12" viewBox="0 0 56 56" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.3315 16.9134L18.0997 27.0077C18.3765 27.4922 18.515 27.7345 18.515 28C18.515 28.2656 18.3765 28.5078 18.0997 28.9923L12.3315 39.0867C11.0932 41.2537 10.474 42.3372 10.9569 42.8745C11.4397 43.4118 12.583 42.9116 14.8696 41.9112L42.4786 29.8323C44.2741 29.0468 45.1718 28.654 45.1718 28C45.1718 27.346 44.2741 26.9532 42.4786 26.1677L14.8696 14.0888C12.583 13.0884 11.4397 12.5882 10.9569 13.1255C10.474 13.6628 11.0932 14.7464 12.3315 16.9134Z" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const emits = defineEmits(["sendQuery"]);

const query = ref<string>("");

const textarea = ref();

const resizeTextarea = () => {
    textarea.value.style.height = "0px";
    textarea.value.style.height = textarea.value.scrollHeight + "px";
}

// Custom Directive to focus on textarea
const vFocus = {
    mounted: (el: any) => el.focus()
}

const sendQuery = () => {
    textarea.value.style.height = "0px";
    textarea.value.focus();

    if (query.value.length == 0) return;

    emits("sendQuery",query.value);

    query.value = "";
}

</script>