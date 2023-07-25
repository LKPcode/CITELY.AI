<template>
                <!-- Step -->
                <div  class="border border-grayer p-3 px-3 mt-2 rounded-md">
                    <span class="text-accent font-bold flex items-center">
                        <span>Step {{ props.step }}</span>
                        <img class="ml-1" src="../../components/icons/Check.svg" alt="">
                    </span>

                    <div class="mt-1 pb-3 relative">
                        <!-- {{ props.step_description  }} -->
                        <Renderer :markdown="props.step_description"  />

                        <div v-if="expanded==false" @click.stop="expanded=true" class="text-xs hover:underline cursor-pointer text-grayest absolute bottom-0 right-1">
                            Expand
                        </div>
                    </div>

                    <!-- Expanded Step -->
                    <div v-if="expanded==true">
                        <div class=" h-[1px] bg-grayer"></div>

                        <div class="flex justify-start items-stretch relative">
                            <div class="mr-2 my-2 min-w-[2px] bg-accent rounded-full"></div>
                            <span class="my-2">
                                <Renderer :markdown="props.step_body"  />
                            </span>


                        <div @click.stop="expanded=false" class="text-xs hover:underline cursor-pointer text-grayest absolute bottom-0 right-1">
                            Shrink
                        </div>
                        </div>

                    </div>

                </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Renderer from './Renderer.vue';


const props = defineProps({
    step: {
        type: String,
        required: true
    },
    step_description: {
        type: String,
        required: true
    },
    step_body: {
        type: String,
        required: true
    }
})

const expanded = ref(false);






</script>