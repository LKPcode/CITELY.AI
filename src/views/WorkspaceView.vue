<template>
    <div class="h-full flex overflow-hidden">

        <!-- <PaperSearch /> -->
        <router-view></router-view>

        <div class="grow flex flex-col">


            <HeaderBar
                :pages="[{ name: 'Home', routename: 'HomeView' }, 
                        { name: 'Workspace', routename: 'WorkspaceView' }]"
                :title="workspace ? workspace.name : ''">

                <RouterLink :to="{name:'MainBar', params:{chat_id: 0}}">
                    <button class="bg-accent rounded-full font-bold px-5 py-2 self-center mr-4">
                        Chat
                    </button>
                </RouterLink>

            </HeaderBar>



            <!-- Library -->
            <div class="px-12 mb-12 grow flex flex-col">

                <!-- <Tabs/> -->
                <div v-if="!loading" 
                    class="grow">
                    <PaperList v-if="paper_store.paper_list.value.length > 0" />
                    <EmptyLibrary v-else />
                </div>
                <div v-else class="flex-grow flex flex-col justify-center items-center">
                    <img  class="w-6 animate-spin" src="../components/icons/Loading.svg" alt="">
                    <span class="text-grayest text-sm mt-2">
                        Loading Papers
                    </span>
                </div>


            </div>

            <div class="flex justify-end items-center px-4 py-2 text-sm text-grayest">
                <button @dblclick="deleteWorkspace" class="hover:underline hover:text-red-500">Delete Workspace</button>
            </div>


        </div>

        <div class=" h-full w-[400px] min-w-[400px] border-l border-grayer overflow-hidden
    //mr-[-400px] transition-all ease-in-out duration-500 sm:duration-700
    ">
            <div class="flex flex-col h-full  min-w-[400px]">
                <!-- RightBar HEADER -->
                <div class="h-[70px] bg-white  border-b border-grayer">
                    <div class="py-3 px-4">
                        <div class="font-bold">
                            Details
                            <span class="text-grayest text-sm ml-2 font-normal"> (4) </span>
                        </div>
                        <div class="text-sm mt-1 text-grayest">Select a paper to view its information.</div>
                    </div>
                </div>


                <!-- <Tabs /> -->


                <!-- RightBar Body -->
                <div class="grow overflow-auto">

                    <PaperMetadata />

                </div>

                <!-- FEEDBACK FOOTER -->
                <div class="p-4 border-t border-grayer text-center font-bold text-grayest text-sm">
                    Provide Feedback for Beta
                </div>


            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import PaperMetadata from '../components/PaperMetadata.vue';
import PaperList from '../components/PaperList.vue';
import useWorkspaceStore from '../store/workspaceStore';
// useRouter
import { RouterView, useRouter, useRoute } from 'vue-router'
// import Tabs from '../components/Tabs.vue';
import workspace_api from '../api/workspaces_api';
import { onMounted } from 'vue';
import HeaderBar from '../components/HeaderBar.vue';
import EmptyLibrary from '../components/EmptyLibrary.vue';
import usePaperStore from '../store/paperStore';
import paper_api from '../api/papers_api';
import { ref } from 'vue';
import { Workspace } from '../types';

const workspace_store = useWorkspaceStore();
const paper_store = usePaperStore();
const loading = ref(true)

const workspace = ref<Workspace>()

const route = useRoute()
onMounted(async () => {
    let workspace_id = route.params.workspace_id as string
    workspace.value = await workspace_api.getWorkspace(workspace_id)
    workspace_store.selectWorkspace(workspace.value)

    //get papers on Mounted
    let temp_papers = await paper_api.getPapersOfWorkspace(workspace_id)
    paper_store.initPaperList(temp_papers)
    loading.value = false

})


// Back button
const router = useRouter()
const goBack = () => {
    router.back()
}


const deleteWorkspace = () => {
    console.log("Delete Workspace")
    workspace_api.deleteWorkspace(workspace_store.selected_workspace.value?.id as string)
    router.push({ name: "EmptyMainBar", params: { workspace_id: null } })
}

</script>