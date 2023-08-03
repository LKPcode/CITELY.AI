<template>

<div class="h-full flex items-stretch">

    <div class="grow flex flex-col">
        <HeaderBar :pages="[{name: 'Home', routename:'HomeView'},{name:'Workspace', routename:'WorkspaceView'},{name:'PDF Viewer', routename:'PaperReaderView'}]" 
        :title="paper ? paper.title : ''"
        >
        </HeaderBar>

        <!-- PDF Viewer -->
        <PDFViewer />
       
    </div>

    <Rightbar />


</div>
</template>

<script setup lang="ts">
import PDFViewer from '../components/PDFViewer.vue';
import HeaderBar from '../components/HeaderBar.vue';
import Rightbar from './Rightbar.vue';

import usePaperStore from '../store/paperStore';
import papers_api from '../api/papers_api';
import { useRoute } from "vue-router"

const paper_store = usePaperStore()

import { onMounted, ref } from 'vue';
import { Paper } from '../types';


const route = useRoute()

const paper = ref<Paper|null>(null)




onMounted(async () => {
    // init global papers list of workspace
    let workspace_id = route.params.workspace_id as string
    try {
        let papers = await papers_api.getPapersOfWorkspace(workspace_id)
        paper_store.initPaperList(papers)
    } catch (error) {
        console.log(error)
    }

    try{
        let paper_id = route.params.paper_id;
        console.log(paper_id)
        paper.value = await papers_api.getPaper(paper_id as string)
        console.log(paper.value)
    }catch(e){
        console.log(e)
    }
})

</script>