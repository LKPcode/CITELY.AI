<template>
    <div class="grow flex flex-col">
        <!-- MainBar HEADER -->
        <div class="h-[70px] min-h-[70px] bg-white  border-b border-grayer">
            <div class="h-[3px] bg-green-500"></div>

            <div class="flex">

                <div @click="goBack"   
                class="bg-lightgray rounded-xl p-2 m-2 cursor-pointer">
                    <img src="../components/icons/Back.svg" class="w-8" alt="">
                </div>

                <div class="mx-4 mt-2.5">
                    <div class="  font-bold">
                        Workspace 1 <span class="text-xs ml-2 underline text-grayest font-normal">6 Papers</span>
                    </div>
                    <div class="text-grayest text-sm ">
                        The 3 body problem the rise of Attention
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
import { onMounted, ref } from 'vue';

import View404 from './View404.vue'

const route = useRoute()
const {showSidebar} = sidebarStore();


let object_url: any = null
const render_pdf = ref(false)
const error = ref(false)

onMounted(async () => {
    try{
        showSidebar.value = false;

        let paper_id = route.params.paper_id;
        console.log(paper_id)
        let paper = await papers_api.getPaper(paper_id as string)
        console.log(paper)
        let pdf_path = paper.pdf_path

        object_url = await papers_api.downloadPDF(pdf_path as string)

        render_pdf.value = true

    }catch(e){
        console.log(e)
        error.value = true
    }
    

})


// Back button

const router = useRouter()
const goBack = () => {
    showSidebar.value = true
    router.back()
}

</script>