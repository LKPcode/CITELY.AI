<template>
    <div class="h-full hidden lg:block w-[400px] min-w-[400px] border-l border-grayer overflow-hidden
    //mr-[-400px] transition-all ease-in-out duration-500 sm:duration-700
    dark:bg-dark dark:text-white
    ">
        <div class="flex flex-col h-full  min-w-[400px]">
        <!-- RightBar HEADER -->
        <div class="h-[70px] border-b border-grayer">
            <div class="py-3 px-4">
                <div class="font-bold">
                    Sources
                    <span class="text-grayest text-sm ml-2 font-normal"> (4) </span>
                </div>
                <div class="text-sm mt-1 text-grayest">Click on the sources to view on PDF</div>
            </div>
        </div>

        <Tabs class="m-auto" :tabs="tabs" 
                :key="selected_tab + 'tabs'"
                @selectTab="selectTab"
                />

        <div class="grow overflow-auto">
            
            <!-- RightBar Body -->
            <SourcesList v-if="selected_tab=='Sources'" />
            <ReferencesList v-else-if="selected_tab=='References'" />
        </div>
       

        <!-- FEEDBACK FOOTER -->
        <div class="p-4 border-t border-grayer text-center font-bold text-gray-300 hover:text-gray-400 cursor-pointer text-sm">
            Provide Feedback for Beta
        </div>


    </div>
    </div>
</template>

<script setup lang="ts">
// useRouter
import { useRoute } from "vue-router";
import Tabs from '../components/Tabs.vue';
import { ref, onMounted, watch } from "vue"
import type { Tab } from "../types"
import SourcesList from "./SourcesList.vue";
import ReferencesList from "./ReferencesList.vue";

let selected_tab = ref<string|null>(null)

let tabs = ref<Tab[]>([])

const route = useRoute();
onMounted(async () => {
    decideTabSystem(route.name)
})

watch(() => route.name, (newVal) => {
    decideTabSystem(newVal)
})

const decideTabSystem = (newVal:any) => {
    tabs.value = [
        {name: "Sources", current: false},
        {name: "References", current: false},
        {name: "Highlights", current: false},
        {name: "Notes", current: false},
    ]
    if (newVal == "MainBar") {
        //  if chat view is open, dont show tabs, just show sources
        tabs.value = []
        selected_tab.value = "Sources"
    }
    else if (newVal == "PaperReaderView") {
        // if paper view is open, show all tabs except sources
        tabs.value = tabs.value.filter(tab => tab.name != "Sources")
    }
    
    if (tabs.value.length > 0){
        // set the selected tab to the first tab
        selected_tab.value = tabs.value[0].name
        tabs.value.forEach(tab => tab.current = false)
        tabs.value[0].current = true
    }
}

const selectTab = (tab: Tab) => {
    tabs.value.forEach(tab => tab.current = false)
    tab.current = true
    selected_tab.value = tab.name
}





</script>