<template>

<div class="h-full flex flex-col">


    <!-- MainBar HEADER -->
    <div class="h-[70px] min-h-[70px] bg-white  border-b border-grayer ">
                <div class="h-[3px] bg-accent"></div>

                <div class="mx-3 h-full flex justify-start items-center">

                    <!-- <div class="text-2xl font-bold">LOGO</div > -->
                    <div class=" text-2xl font-bold">CITELY.AI</div >
                    <!-- <span class="text-grayest -mb-2 text-sm ml-4">Home</span> -->
                    <span class="ml-auto h-full flex items-center">
                        <button
                            @click="logout"
                             class="flex items-center hover:text-red-600 text-sm font-semibold  hover:bg-lightgray px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                            Log Out
                        </button>
                      
                    </span>

                </div>


    </div>

<div class="mt-12">
    <div class="text-left max-w-4xl mx-auto">
        <div class="text-2xl font-bold mt-4 ml-4">Workspaces</div>
        <div class="text-grayest text-sm mt-2 ml-4">Select a workspace to view its papers.</div>
    </div>

</div>

    <WorkspaceList />

   

    </div>

</template>


<script lang="ts" setup>
import WorkspaceList from '../components/WorkspaceList.vue'
import authentication_api from '../api/authentication_api';


const logout = () => {
    authentication_api.logout()
}


</script>

<style scoped>

</style>