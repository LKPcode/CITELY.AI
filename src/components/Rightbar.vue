<template>
    <div class=" h-full hidden md:block w-[400px] min-w-[400px] border-l border-grayer overflow-hidden
    //mr-[-400px] transition-all ease-in-out duration-500 sm:duration-700
    ">
        <div class="flex flex-col h-full  min-w-[400px]">
        <!-- RightBar HEADER -->
        <div class="h-[70px] bg-white  border-b border-grayer">
            <div class="py-3 px-4">
                <div class="font-bold">
                    Sources
                    <span class="text-grayest text-sm ml-2 font-normal"> (4) </span>
                </div>
                <div class="text-sm mt-1 text-grayest">Click on the sources to view on PDF</div>
            </div>
        </div>

        <Tabs class="m-auto" :tabs="tabs" />

        <!-- RightBar Body -->
        <div v-if="sources_store.source_list.value.length > 0" class="grow overflow-auto">

            <!-- SOURCE COMPONENT -->
            <div v-for=" source in sources_store.source_list.value" class="border-b border-grayer px-4 py-2">
                <div class="mx-2 border-b border-grayer text-sm">
                    <div class="flex items-center mb-1">
                        <span class="grow truncate mr-6 font-bold"> <span class="text-grayest ">Title: </span> {{source.title}}</span>
                        <button @click="openPDF(source.paper_id)" class="border-2 px-3 rounded-full border-accent hover:bg-accent "> Open </button>
                    </div>
                    <div class="flex items-center text-xs mb-2">
                        <span class="grow truncate mr-6 font-bold"> <span class="text-grayest ">Section: </span> {{ source.section }} </span>
                        <span class="text-grayest font-semibold">Published: {{ source.published_at }}</span>
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

        <!-- FEEDBACK FOOTER -->
        <div class="p-4 border-t border-grayer text-center font-bold text-grayest text-sm">
            Provide Feedback for Beta
        </div>


    </div>
    </div>
</template>

<script setup lang="ts">
// useRouter
import { useRouter, useRoute } from "vue-router";
import {sidebarStore} from "../store/sidebarStore";
import useSourcesStore from '../store/sourcesStore';
import Tabs from '../components/Tabs.vue';
import { ref } from "vue"
import type { Tab } from "../types"

let tabs = ref<Tab[]>([{
        name:"Sources",
        current: true
    },
    {
        name:"Notes",
        current:false
    },
    {
        name:"Highlights",
        current:false
    },
    {
        name:"Citations",
        current:false
    }

])

const  sources_store = useSourcesStore();
const {showSidebar} = sidebarStore();

// Open PDF
const router = useRouter();
// const route = useRoute();
const openPDF = (paper_id: string) => {
//   let current_workspace = route.params.workspace_id; 

  showSidebar.value = false;
  router.push({ name: "PaperView", params: { paper_id: paper_id }});
};





</script>