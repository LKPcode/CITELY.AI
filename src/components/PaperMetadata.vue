<template>
    <div v-if= "paper_store.selected_paper.value != null" class="h-full p-8 w-[400px] bg-primary border-l-grayer  flex flex-col">
        <!-- TITLE -->
        <div class="text-lg font-bold mb-1">

            {{ paper_store.selected_paper.value?.title }}
        </div>
        <div class="mb-4">
            <!-- Publication Date -->
            <span class="text-sm font-medium text-gray-600">
                25 March 2023
            </span>
            -
            <!-- Journal -->
            <span class="text-sm font-medium text-gray-600">
                Journal of Computer Languages
            </span>
        </div>
        <!-- Authors -->
        <div class="uppercase text-sm font-bold text-gray-600 mb-2"> AUTHORS </div>
        <div class="text-sm font-medium text-gray-600 mb-4">
            {{ paper_store.selected_paper.value?.author }}
        </div>
        <!-- DOI -->
        <div class="uppercase text-sm font-bold text-gray-600 mb-2"> DOI </div>
        <div class="text-sm font-medium text-gray-600 mb-4">
            DOI: 10.1016/j.cola.2013.03.005
        </div>
         <!-- Links -->
         <div class="uppercase text-sm font-bold text-gray-600 mb-2"> Links </div>

        <a class="text-sm font-medium text-blue-500 mb-2 truncate h-12 hover:underline"
            href="https://www.sciencedirect.com/science/article/pii/S1477842413000368" target="_blank"
        >
            https://www.sciencedirect.com/science/article/pii/S1477842413000368
        </a>

         <!-- Abstract -->
         <div class="uppercase text-sm font-bold text-gray-600 mb-2"> ABSTRACT </div>
        <div class="text-sm font-medium text-gray-600 mb-4  overflow-auto hide-scrollbar">
          {{ paper_store.selected_paper.value?.abstract }} 
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



  onMounted( async () => {
    await refreshLibrary()
})

const refreshLibrary = async () => {

    
    paper_store.selected_paper
}

</script>