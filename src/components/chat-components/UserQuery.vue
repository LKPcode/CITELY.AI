<template>
<div class="bg-zinc-100 flex justify-center">
            <!-- USER QUERY -->
            <div class=" w-[80%] max-w-[800px] text-sm py-4 relative min-h-[60px] flex items-center">

                
                <span class="whitespace-pre-wrap	">
                    <!-- <Renderer :markdown="text" class="ml-2 mt-2" /> -->
                    {{ text  }}
                </span>
                <div class="absolute -left-12 top-3.5 w-8 h-8 bg-accent rounded-full"></div>
            </div>
        </div>

</template>

<script lang="ts" setup>
// import Renderer from './Renderer.vue';



const {text} = defineProps({
    text: {
        type: String,
        required: true
    }

});




</script>