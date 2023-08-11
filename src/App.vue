<template>

<router-view v-slot="{ Component }">
  <transition name="slide-fade">
    <component :is="Component" />
  </transition>
</router-view>
<!-- 
<Toaster 
    position="top-right" :duration="1500" 
    closeButton  :toastOptions="{
    className: 'notification',
    descriptionClassName: 'my-toast-description'
  }" /> -->

 <Notification />

</template>

<script setup lang="ts">
// import { Toaster } from 'vue-sonner'



// import { onMounted } from 'vue'
import { onMounted } from 'vue';
import Notification from './components/Notification.vue'

onMounted(() => {
 
})

</script>

<style>




</style>
