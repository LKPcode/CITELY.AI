<template>

<span :id="'tooltip_' + tooltip_id">
   <slot></slot>
</span>

</template>

<script setup lang="ts">
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/light-border.css';

import { onMounted, ref } from 'vue';

let tooltip_id = ref("0")
 // Random number for tooltip id
tooltip_id.value = Math.floor( Math.random() * 1000000000).toString()

const {content} = defineProps({
    content: String
})


onMounted(() => {

   

    tippy(`#tooltip_${tooltip_id.value}` , {
        content: content,
        theme: 'light-border',
        trigger: 'click', // Show the tooltip on click

      });
});

</script>