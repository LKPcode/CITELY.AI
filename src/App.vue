<template>

<router-view v-slot="{ Component }">
  <transition name="slide-fade">
    <component :is="Component" />
  </transition>
</router-view>

<Toaster 

    position="top-right" :duration="1500" 
    closeButton  :toastOptions="{
    className: 'notification',
    descriptionClassName: 'my-toast-description'
  }" />

</template>

<script setup lang="ts">
import { Toaster, toast } from 'vue-sonner'

import { onMounted } from 'vue'
// import Notification from './components/Notification.vue'

onMounted(() => {

  // toast.success(
  //     "Succesful Download", {
  //       style: {
  //         border: '1px solid rgb(244, 43, 147)',
  //         'margin-top': '20px',
  //         translate: '-20px',
  //     },
  //     description: 'Monday, January 3rd at 6:00pm'
  // })

})


</script>

<style>




</style>
