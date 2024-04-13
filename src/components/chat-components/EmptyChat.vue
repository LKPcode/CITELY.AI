<template>
    <div class="grow">
        <div class="flex flex-col items-center justify-center h-full">
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-gray-400 mb-0  text-3xl flex items-center">
                        <svg class="w-10 mr-1 stroke-gray-400 stroke-2 "
                             width="35" height="35" viewBox="0 0 35 35"  fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.1666 13.8334C29.1666 10.0621 29.1666 8.17649 27.995 7.00492C26.8234 5.83334 24.9378 5.83334 21.1666 5.83334H13.8333C10.062 5.83334 8.1764 5.83334 7.00482 7.00492C5.83325 8.17649 5.83325 10.0621 5.83325 13.8333V27.1667C5.83325 28.1095 5.83325 28.5809 6.12615 28.8738C6.41904 29.1667 6.89044 29.1667 7.83325 29.1667H21.1666C24.9378 29.1667 26.8234 29.1667 27.995 27.9951C29.1666 26.8235 29.1666 24.9379 29.1666 21.1667V13.8334Z"  stroke-width="3"/>
                            <path d="M13.125 14.5833L21.875 14.5833"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.125 20.4167H17.5"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    CHAT
                </h1>
                    
                    <h6 class="text-gray-300 mb-16 text-sm flex items-center">
                        Focusing on {{ selected_workspace?.paper_num }} Papers
                    </h6>
                </div>
                    

                <div class="grid grid-cols-2 gap-4 max-w-lg">
                    <span class="text-center text-gray-500 text-sm font-bold">EXAMPLES</span>
                    <span class="text-center text-gray-500 text-sm font-bold">LIMITATIONS</span>

                   <div v-for="_ in 4"
                    class="bg-gray-50 dark:bg-darker shadow-sm p-4 rounded-md text-gray-500 dark:text-lightgray cursor-pointer hover:bg-gray-100 dark:hover:bg-darker text-center">
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useWorkspaceStore  from '../../store/workspaceStore';

const { selected_workspace } = useWorkspaceStore();


</script>