<template>
<!-- Finall Answer -->
<div class="mt-2">
                    <div class="flex items-center">
                        <img src="../../components/icons/Answer.svg" class="w-5" alt="">
                        <span class="text-accent ml-2 mt-1 text-md font-bold">Final Answer</span>
                    </div>

                    <div class="ml-2 mt-2">
                        {{ props.answer_body }}
                    </div>

                </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    answer_body: {
        type: String,
        required: true
    },

})

</script>