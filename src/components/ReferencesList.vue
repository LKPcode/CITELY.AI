<template>
    <div v-if="papers.length > 0"
         class="p-4">
        <ReferenceListItem v-for="paper in papers" :key="paper.paperId" :paper="paper" />
    </div>
    <div v-else class="border-l-grayer text-grayest text-sm h-full flex flex-col items-center justify-center">
        No References
    </div>

</template>

<script setup lang="ts">
import ReferenceListItem from './ReferenceListItem.vue';
import papers_api from '../api/papers_api';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const papers = ref<any>([])

const route = useRoute()
const getPaperRefs = async () => {
    let paper_id = route.params.paper_id as string

    try {
        let refs = await papers_api.getPaperReferences(paper_id);
        console.log("KALISPERA",refs);
        papers.value = refs.map((ref:any) => ({...ref.citedPaper }));
        console.log("KALISP",papers.value);

    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    await getPaperRefs()
})


</script>