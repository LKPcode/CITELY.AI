<template>
    <div class="text-center flex flex-col h-full items-center justify-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            aria-hidden="true">
            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No Papers</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding papers in your library.</p>
        <div class="mt-6">
            <div class="flex items-center rounded-md border border-accent cursor-pointer">
                <button @click="addPapers" type="button"
                class="block  px-3 py-1.5 text-center text-sm leading-6 text-grayest shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Search for papers to add
                </button>
                <svg class="mx-2  h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const addPapers = () => {
    router.push({name: 'SearchView'});
};


</script>