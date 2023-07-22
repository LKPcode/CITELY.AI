<template>

    <ul v-if="papers.length > 0" role="list" class="divide-y divide-grayer ">

        <PaperSearchListItem v-for="paper in papers" :key="paper.paperId" :paper="paper" />

</ul>
<div v-else class="h-full flex justify-center items-center">
            <p class="text-grayest">
                No papers found
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