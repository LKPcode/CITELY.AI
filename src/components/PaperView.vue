<template>
    <div class="grow flex flex-col">
        <HeaderBar :pages="[{name: 'Home', routename:'HomeView'},{name:'Workspace', routename:'WorkspaceView'},{name:'Chat',  routename:'MainBar'},{name:'Inspector', routename:'PaperView'}]" title="The title of the PDF" >

        </HeaderBar>

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

import HeaderBar from '../components/HeaderBar.vue';
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