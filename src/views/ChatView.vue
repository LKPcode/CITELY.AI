<template>
    <div class="h-full w-screen flex overflow-auto	">


        <router-view v-slot="{ Component }">
            <!-- <keep-alive > -->
                <component :is="Component" />
            <!-- </keep-alive> -->
        </router-view>


        <Rightbar />

        <DeleteChatPopup />

    </div>
</template>

<script setup lang="ts">

import DeleteChatPopup from '../components/DeleteChatPopup.vue';
import Rightbar from '../components/Rightbar.vue';



</script>