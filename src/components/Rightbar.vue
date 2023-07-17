<template>
    <div class=" h-full w-[400px] min-w-[400px] border-l border-grayer overflow-hidden
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

        <!-- RightBar Body -->
        <div class="grow overflow-auto">

            <!-- SOURCE COMPONENT -->
            <div v-for=" in [1,2,3,4,5,6,7,8,9]" class="border-b border-grayer px-4 py-2">
                <div class="mx-2 border-b border-grayer text-sm">
                    <div class="flex items-center mb-1">
                        <span class="grow truncate mr-6 font-bold"> <span class="text-grayest ">Title: </span> Bitcoin: A Peer-to-Peer Electronic Cash System </span>
                        <button @click="openPDF" class="border-2 px-3 rounded-full border-accent hover:bg-accent "> Open </button>
                    </div>
                    <div class="flex items-center text-xs mb-2">
                        <span class="grow truncate mr-6 font-bold"> <span class="text-grayest ">Section: </span> Privacy </span>
                        <span class="text-grayest font-semibold">Published: Oct 2008</span>
                    </div>
                </div>
                <div class="m-2 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, expedita vero alias mollitia deleniti laborum dolore omnis, aliquam, vel cupiditate maxime nulla. Alias labore iure enim totam ad? Odit, qui.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora beatae, non nulla magnam a ut dolores nisi aspernatur.
                </div>
            </div>



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

const {showSidebar} = sidebarStore();

// Open PDF
const router = useRouter();
const route = useRoute();
const openPDF = () => {
  let current_workspace = route.params.workspace_id; 
  showSidebar.value = false;
  router.push(`/workspace/${current_workspace}/paper/1`);
};

</script>