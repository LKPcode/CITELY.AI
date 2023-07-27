<template>
    <div class="h-full flex overflow-hidden">

        <!-- <PaperSearch /> -->
        <router-view></router-view>

        <div class="grow flex flex-col">


            <!-- MainBar HEADER -->
            <div class="h-[70px] min-h-[70px] bg-white  border-b border-grayer ">
                <div class="h-[3px] bg-blue-400"></div>

                <div class="flex">

                    <div @click="goBack" class="bg-lightgray rounded-xl p-2 m-2 cursor-pointer">
                        <img src="../components/icons/Back.svg" class="w-8" alt="">
                    </div>

                    <div class="mx-4 mt-2.5">
                        <div class="  font-bold">
                            {{ workspace_store.selected_workspace.value?.name  }}
                            <span class="text-xs ml-2 underline text-grayest font-normal"> {{ workspace_store.selected_workspace.value?.paper_num }} Papers</span>
                        </div>
                        <div class="text-grayest text-sm ">
                            Add Papers to your workspace
                        </div>
                    </div>
                </div>


            </div>




            <!-- Library -->
            <div class="px-12 mb-12 grow flex flex-col">

                <!-- <Tabs/> -->
                <div class="grow">
                    <PaperList />
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

const workspace_store = useWorkspaceStore();

const route = useRoute()
onMounted( async ()=>{
    let workspace_id = route.params.workspace_id as string
    let workspace = await workspace_api.getWorkspace(workspace_id)
    workspace_store.selectWorkspace(workspace)
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