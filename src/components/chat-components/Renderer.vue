<template>
    <div v-html="rendered_content"></div>
</template>


<script lang="ts" setup>
import { computed } from 'vue'


const props = defineProps<({
    markdown: String
})>();

const rendered_content = computed(() => {
    const options = {
        htmlTags: true,
      }
      const html = window.render( props.markdown , options);
      return html;
})



</script>