<template>
    <div v-if="paper_store.selected_paper.value != null"
        class="h-full p-8 w-[400px] bg-primary border-l-grayer  flex flex-col">
        <!-- TITLE -->
        <div class="text-lg font-bold mb-1 dark:text-white">

            {{ paper_store.selected_paper.value?.title }}
        </div>
        <div class="mb-4">
            <!-- Publication Date -->
            <span class="text-sm font-medium text-lightgray">
                {{paper_store.selected_paper.value?.published_at}}
            </span>
            -
            <!-- Journal -->
            <span class="text-sm font-medium text-lightgray">
                {{paper_store.selected_paper.value?.publication_venue}}
            </span>
        </div>
        <!-- Authors -->
        <div class="uppercase text-sm font-bold text-lightgray mb-2"> AUTHORS </div>
        <div class="text-sm font-medium text-lightgray mb-4">
            <div class="text-sm font-medium text-lightgray mb-4">
                {{ paper_store.selected_paper.value?.authors.map(author => author.name).join(', ') }}
            </div>
        </div>
       
        <!-- Links -->
        <div class="uppercase text-sm font-bold text-lightgray mb-0"> Links </div>

        <a class="text-sm font-medium text-blue-500 mb-4 truncate h-12 hover:underline"
            :href="paper_store.selected_paper.value.paper_url" target="_blank">
            {{ paper_store.selected_paper.value.paper_url }}
        </a>

        <!-- Abstract -->
        <div class="uppercase text-sm font-bold text-lightgray mt-2"> ABSTRACT </div>
        <div class="text-sm font-medium text-lightgray mt-2 overflow-auto hide-scrollbar">
            {{ paper_store.selected_paper.value.abstract }}
        </div>
    </div>
    <div v-else class="border-l-grayer text-grayest text-sm h-full flex flex-col items-center justify-center">
        No Paper Selected
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import usePaperStore from '../store/paperStore';
const paper_store = usePaperStore()



onMounted(async () => {
    await refreshLibrary()
})

const refreshLibrary = async () => {


    paper_store.selected_paper
}

</script>