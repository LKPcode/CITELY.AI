<template>
    <!-- MainBar HEADER -->
    <div class="h-[70px] group min-h-[70px] bg-white dark:bg-dark  border-b border-grayer relative">
                <div class="h-[3px] bg-accent"></div>

                <div class="flex items-center">

                    <div @click="goBack" class="bg-gray-100 dark:bg-darker dark:hover:bg-darker dark:hover:brightness-90 hover:bg-lightgray rounded-xl p-2 m-2 cursor-pointer">
                        <img src="../components/icons/Back.svg" class="w-8 " alt="">
                    </div>

                    <div class="mx-4">
                        <div class="font-bold">

                            <nav class="flex" aria-label="Breadcrumb">
                                <ol role="list" class="flex items-center">
                                <!-- <li>
                                    <div>
                                    <router-link  to="/" class="text-gray-400 hover:text-gray-500">
                                        <img src="../components/icons/Home.svg" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                        Home
                                    </router-link >
                                    </div>
                                </li> -->
                                <li v-for="(page, index) in pages" :key="page.name">
                                    <div class="flex items-center">
                                        <router-link 
                                        :to="{ name: page.routename }"
                                        :class="index === pages.length - 1 ? 'font-bold text-gray-700 hover:text-gray-900 dark:text-white' : 'font-medium text-gray-500 hover:text-gray-700 dark:text-lightgray dark:hover:text-white'"
                                        class=" text-sm mr-2 " > {{ page.name }} </router-link>
                                        <img
                                            v-if="index !== pages.length - 1"
                                            src="../components/icons/RightArrow.svg" class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400 dark:text-lightgray" aria-hidden="true" />
                                    </div>
                                </li>
                                </ol>
                            </nav>

                        </div>
                        <div v-if="title!=''" class="mt-1 text-grayest text-sm">
                            {{ title }}
                        </div>
                        <div v-else class="mt-1 text-white text-sm">
                            -
                        </div>

                    </div>
                    
                    

                    <span class="ml-auto h-full">
                        <slot></slot>
                    </span>

                </div>


        <!-- NOTIFICATION -->
        <!-- <div class="absolute h-0 flex justify-center items-center 
                    group-hover:h-8
                    w-full shadow-sm border-b bottom-0 
                    translate-y-full overflow-hidden transition-all duration-500">
            <div class="text-xs font-semibold text-accent text-center">Message</div>
        </div> -->

    </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'


const { pages, title } = defineProps({
    pages: {
        type: Array<{
            name: string,
            routename: string
        }>,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const router = useRouter()
const goBack = () => {
    router.push({ name: pages[pages.length - 2].routename })
}


</script>