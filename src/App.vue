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
import { Toaster } from 'vue-sonner'

import { onMounted } from 'vue'
// import Notification from './components/Notification.vue'


import user_api from './api/user_api'
import useUserStore from './store/UserStore'


const user_store = useUserStore()
onMounted(async () => {
    let user = await user_api.getUserData()
    user_store.setUser(user)
})


</script>

<style>




</style>
