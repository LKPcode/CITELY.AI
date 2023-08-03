<template>
    <div class="grow flex flex-col">
        <HeaderBar :pages="[{name: 'Home', routename:'HomeView'},{name:'Workspace', routename:'WorkspaceView'},{name:'Chat',  routename:'MainBar'},{name:'Inspector', routename:'PaperView'}]" title="The title of the PDF" >
        </HeaderBar>

        <!-- PDF Viewer -->
        <PDFViewer />
       
    </div>
</template>

<script setup lang="ts">
import PDFViewer from '../components/PDFViewer.vue';
import HeaderBar from '../components/HeaderBar.vue';

</script>