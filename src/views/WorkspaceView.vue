<template>
    <div class="h-full flex overflow-hidden	">
        <Sidebar />

        <router-view v-slot="{ Component }">
            <!-- <keep-alive > -->
                <component :is="Component" />
            <!-- </keep-alive> -->
        </router-view>


        <Rightbar />

    </div>
</template>

<script setup lang="ts">
import Rightbar from '../components/Rightbar.vue';
import Sidebar from '../components/Sidebar.vue'



</script>