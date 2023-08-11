<template>

    <HeaderBar
        v-if="route.name == 'AccountSettings'"
        class="sticky w-full top-0 z-50"
        :pages="[{ name: 'Home', routename: 'HomeView' }, 
                        { name: 'Settings', routename: 'AccountSettings' }]"
        title="Profile Settings" >

        <div class=" text-2xl font-bold underline decoration-accent mr-4 ">
                        CITELY.AI
        </div >
    </HeaderBar>

    <HeaderBar
        v-else-if="route.name == 'BillingSettings'"
        class="sticky w-full top-0 z-50"
        :pages="[{ name: 'Home', routename: 'HomeView' }, 
                        { name: 'Settings', routename: 'BillingSettings' }]"
        title="Billing Settings" >

        <div class=" text-2xl font-bold underline decoration-accent mr-4 ">
                        CITELY.AI
        </div >
        </HeaderBar>
    



 

<div class="mx-auto max-w-7xl  lg:flex lg:gap-x-16 lg:px-8">
  <aside class="flex  overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
    <nav class="flex-none px-4 sm:px-6 lg:px-0">
      <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
        <li>
          <!-- Current: "bg-gray-50 text-accent", Default: "text-gray-700 hover:text-accent hover:bg-gray-50" -->
          <RouterLink :to="{name: 'AccountSettings'}"  
            :class="route.name == 'AccountSettings' ? 'text-accent bg-gray-50' : 'text-gray-700'"
            class="hover:bg-gray-50 hover:text-accent  group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold">
            <svg
            :class="route.name == 'AccountSettings' ? 'text-accent' : 'text-gray-700'" 
                class="h-6 w-6 shrink-0 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            General
          </RouterLink>
        </li>
        
        <li>
        <RouterLink :to="{name: 'BillingSettings'}"  
            :class="route.name == 'BillingSettings' ? 'text-accent bg-gray-50' : 'text-gray-700'"
            class=" hover:text-accent hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold"
            >
            <svg
            :class="route.name == 'BillingSettings' ? 'text-accent' : 'text-gray-700'" 
            class="h-6 w-6 shrink-0 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            Billing
        </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>

  <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">

    <!-- <AccountSettings /> -->
    <!-- <BillingSettings /> -->
    <router-view></router-view>

  </main>
</div>


</template>

<script lang="ts" setup>
import HeaderBar from '../components/HeaderBar.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const route = useRoute();



import user_api from '../api/user_api'
import useUserStore from '../store/UserStore'


const user_store = useUserStore()
onMounted(async () => {
    let user = await user_api.getUserData()
    user_store.setUser(user)
})


</script>