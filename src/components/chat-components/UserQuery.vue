<template>
    <TransitionIn>
<div class="bg-zinc-100 dark:bg-darker dark:text-lightgray flex justify-center">
            <!-- USER QUERY -->
            <div class=" w-[80%] max-w-4xl text-sm py-4 relative min-h-[60px] flex items-center">

                
                <span class="whitespace-pre-wrap	">
                    <!-- <Renderer :markdown="text" class="ml-2 mt-2" /> -->
                    {{ text  }}
                </span>
                <div class="absolute hidden sm:block -left-12 top-3.5 w-8 h-8 bg-accent rounded-full"></div>
            </div>
        </div>
</TransitionIn>
</template>

<script lang="ts" setup>
// import Renderer from './Renderer.vue';
import TransitionIn from './TransitionIn.vue';



const {text} = defineProps({
    text: {
        type: String,
        required: true
    }

});




</script>