<template>
 <div v-if="sources_store.source_list.value.length > 0" class="grow overflow-auto">

    <!-- SOURCE COMPONENT -->
    <div v-for=" source in sources_store.source_list.value" class="border-b border-grayer px-4 py-2">
        <div class="mx-2 border-b border-grayer text-sm">
            <div class="flex items-center mb-1">
                <span class="grow truncate mr-6 font-semibold "> <span class="text-grayest font-normal ">Title: </span> {{source.title}}</span>
                <button @click="openPDF(source.paper_id)" class="hover:underline px-3 rounded-full text-accent font-bold"> Inspect </button>
            </div>
            <div class="flex items-center text-xs mb-2">
                <span class="grow truncate mr-6"> <span class="text-grayest ">Section: </span> {{ source.section }} </span>
                <span class="text-grayest">Published: {{ source.published_at }}</span>
            </div>
        </div>
        <div class="m-2 text-sm">
            {{ source.passage }}
        </div>
    </div>
    </div>
    <div v-else class="border-l-grayer text-grayest text-sm h-full flex flex-col items-center justify-center">
    No Sources
    </div>


</template>

<script setup lang="ts">
import useSourcesStore from '../store/sourcesStore';
import { useRouter } from "vue-router";

const  sources_store = useSourcesStore();


// Open PDF
const router = useRouter();
const openPDF = (paper_id: string) => {
//   let current_workspace = route.params.workspace_id;
  router.push({ name: "PaperView", params: { paper_id: paper_id }});
};


</script>