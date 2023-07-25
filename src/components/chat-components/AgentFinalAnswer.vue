<template>
<!-- Finall Answer -->
<div class="mt-2">
                    <div class="flex items-center">
                        <img src="../../components/icons/Answer.svg" class="w-5" alt="">
                        <span class="text-accent ml-2 mt-1 text-md font-bold">Final Answer</span>
                    </div>

                    <Renderer :markdown="props.answer_body" class="ml-2 mt-2" />
                </div>
</template>

<script lang="ts" setup>
import Renderer from './Renderer.vue';

const props = defineProps({
    answer_body: {
        type: String,
        required: true
        
    },


})


</script>

