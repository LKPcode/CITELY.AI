<template>
    <div class="grow flex flex-col">
        <!-- MainBar HEADER -->
        <div class="h-[70px] min-h-[70px] bg-white  border-b border-grayer">
            <div class="h-[3px] bg-green-500"></div>

            <div class="flex">

                <div @click="goBack"   
                class="bg-lightgray rounded-xl p-2 m-2 cursor-pointer w-12 min-w-12">
                    <img src="../components/icons/Back.svg" class="" alt="">
                </div>

                <div class="mx-4 mt-2.5">
                    <div v-if="selected_workspace" class="  font-bold">
                       {{ selected_workspace.name }}
                        <span class="text-xs ml-2 underline text-grayest font-normal">6 Papers</span>
                    </div>
                    <div v-if="paper" class="text-grayest text-sm truncate">
                        {{paper.title}}
                    </div>
                </div>
            </div>
        </div>

        <!-- PDF Viewer -->

        <div v-if="!error" class="grow">
            <iframe id="pdf_viewer_embeded" class="grow z-10" width="100%" height="100%"
                v-if="render_pdf"
                :src="`/pdfviewer/web/viewer.html?file=${object_url}`"
                :key="object_url"
                >
            </iframe>
            <div v-if="!render_pdf" class="flex flex-col justify-center items-center h-full">
                <img  class="w-6 animate-spin mr-3" src="../components/icons/Loading.svg" alt="">
                <span class="text-grayest text-sm mt-2">
                    Loading PDF
                </span>
            </div>
        </div>
        <div v-else class="grow">
            <View404 />
        </div>

    </div>
</template>

<script setup lang="ts">
// useRouter
import { useRouter, useRoute } from 'vue-router'
import { sidebarStore } from '../store/sidebarStore';
import papers_api from '../api/papers_api';
import { onMounted, ref, watch } from 'vue';
import { Paper } from '../types';
import useWorkspaceStore from '../store/workspaceStore';

import View404 from './View404.vue'


const route = useRoute()
const {showSidebar} = sidebarStore();

const {selected_workspace} = useWorkspaceStore()

const paper = ref<Paper|null>(null)


let object_url: any = null
const render_pdf = ref(false)
const error = ref(false)

onMounted(async () => {
    await getPDFObjecURL()
})


watch(() => route.params.paper_id, async (paper_id) => {
    if (paper_id==null) {
        return 
    }
    render_pdf.value = false
    error.value = false
    await getPDFObjecURL()
})


const getPDFObjecURL = async () => {
    try{
        showSidebar.value = false;

        let paper_id = route.params.paper_id;
        console.log(paper_id)
        paper.value = await papers_api.getPaper(paper_id as string)
        console.log(paper.value)
        let pdf_path = paper.value.pdf_path

        object_url = await papers_api.downloadPDF(pdf_path as string)

        render_pdf.value = true

    }catch(e){
        console.log(e)
        error.value = true
    }
}


// Back button
const router = useRouter()
const goBack = () => {    
    router.back()
    showSidebar.value = true

}

</script>