<template>

<div class="h-full flex flex-col pt-16 dark:bg-dark dark:text-white">


    <!-- MainBar HEADER -->
    <div class="h-[70px] min-h-[70px] bg-white dark:bg-dark  border-b border-grayer fixed top-0 w-full z-40 ">
                <div class="h-[3px] bg-accent"></div>

                <div class="mx-3 h-full flex justify-start items-center">

                    <!-- <div class="text-2xl font-bold">LOGO</div > -->
                    <div class=" text-2xl font-bold underline decoration-accent ">
                        CITELY.AI
                    </div >
                    <!-- <span class="text-accent text-sm mb-5 ml-1 self-end">Pro</span> -->
                    <!-- <span class="text-grayest -mb-2 text-sm ml-4">Home</span> -->
                    <span class="ml-auto h-full flex items-center">
                        <button
                        @click="scrollTo('pricing-section')"
                        class="flex items-center  text-sm font-semibold  hover:bg-lightgray dark:hover:bg-darker px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                        Pricing
                    </button>
                    <button
                        @click="scrollTo('FAQ')"
                         class="flex items-center  text-sm font-semibold  hover:bg-lightgray dark:hover:bg-darker px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                        FAQ
                    </button>



                    <RouterLink
                        to="/settings"
                         class="flex items-center  text-sm font-semibold  hover:bg-lightgray dark:hover:bg-darker px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                        Settings
                    </RouterLink>

                    <button
                         class="flex items-center  text-sm font-semibold  hover:bg-lightgray dark:hover:bg-darker px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                        {{ user_store.user.value?.subscription_plan }}
                    </button>
                    
                    
                    </span>

                </div>


    </div>



    <div class="mt-12">
        <div class="text-left max-w-4xl mx-auto">
            <div class="text-2xl font-bold mt-4 ml-4">Workspaces</div>
            <div class="text-grayest text-sm mt-2 ml-4">Select a workspace to view its papers.</div>
        </div>

    </div>


    <WorkspaceList />

    <div class="border-b-2 border-accent "></div>

   
 </div>

 <PricingSection id="pricing-section"/>

 <FAQ id="FAQ"/>

 <Footer class="mt-24" />

</template>


<script lang="ts" setup>
import WorkspaceList from '../components/WorkspaceList.vue'
import FAQ from '../components/FAQ.vue'
import PricingSection from '../components/PricingSection.vue'
import user_api from '../api/user_api';
import useUserStore from '../store/UserStore';
import { onMounted } from 'vue';
import Footer from '../components/Footer.vue';



const scrollTo = (to: string) => {
    const faq = document.getElementById(to || 'FAQ')
    faq?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
}


const user_store = useUserStore()

onMounted(async () => {
    const user = await user_api.getUserData()
    user_store.setUser(user)
})





</script>

<style scoped>

</style>