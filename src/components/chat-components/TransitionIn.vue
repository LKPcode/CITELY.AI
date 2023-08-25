<template>
    <div class=" transition-all opacity-0 duration-300 ease-in-out"
    :class="{'opacity-100': show}"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue';

let show = ref(false);
onMounted(
    () => {
        setTimeout(() => {
            show.value = true;
        }, 100)
    }
)


</script>