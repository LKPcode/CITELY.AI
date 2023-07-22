<template>

    <ul v-if="papers!= null && papers.length > 0" role="list" class="divide-y divide-grayer ">

        <PaperSearchListItem v-for="paper in papers" :key="paper.paperId" :paper="paper" />
    
    </ul>
    <div v-else-if="papers!= null && papers.length == 0" class="h-full flex justify-center items-center">
                <p class="text-grayest">
                    No papers found
                </p>
    </div>
    <div v-else-if="papers==null" class="h-full flex justify-center items-center">
                <p class="text-grayest">
                    Searching...
                </p>
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import PaperSearchListItem from './PaperSearchListItem.vue';



const { papers } = defineProps<{
    papers: any
}>()

onMounted(() => {
    console.log(papers)
})


</script>