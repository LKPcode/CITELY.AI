<template>

<router-view v-slot="{ Component }">
    <component :is="Component" />
</router-view>


 <Notification />

</template>

<script setup lang="ts">

// import { onMounted } from 'vue'
import Notification from './components/Notification.vue'
// import { useNotification } from "@kyvg/vue3-notification";


</script>

<style>




</style>
