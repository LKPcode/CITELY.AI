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

        <div class="grow">
            <iframe class="grow z-10" id="pdf_viewer_embeded" width="100%" height="100%"
                src="/pdfviewer/web/viewer.html?file=/pdfviewer/web/attantion.pdf"

                >
            </iframe>

        </div>

    </div>
</template>

<script setup lang="ts">
// useRouter
import { useRouter } from 'vue-router'
import { sidebarStore } from '../store/sidebarStore';



// Back button
const {showSidebar} = sidebarStore();
const router = useRouter()
const goBack = () => {
    showSidebar.value = true
    router.back()
}

</script>