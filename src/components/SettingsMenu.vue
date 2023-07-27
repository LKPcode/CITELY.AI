<template>
     <div class="relative border-t justify-self-end border-grayer">
            <div @click="toggleMenu" class="flex items-center hover:bg-lightgray px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                <img src="../components/icons/Settings.svg" class="w-6" alt="">
                <div class="font-bold text-sm ml-4">Settings</div>
            </div>

            <div v-if="showMenu" class="absolute -top-2 -translate-y-full w-full flex justify-center">
                <div class="bg-white w-[95%] border shadow-lg rounded-md">
                    <div @click="LogOut" class="flex items-center hover:text-red-600  hover:bg-lightgray px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                        <img src="../components/icons/LogOut.svg" class="w-6" alt="">
                        <div class="font-bold text-sm ml-4">Log Out</div>
                    </div>

                    <div class="flex items-center hover:bg-lightgray px-4 py-2 mx-4 my-2 rounded-xl cursor-pointer">
                        <img src="../components/icons/Account.svg" class="w-6" alt="">
                        <div class="font-bold text-sm ml-4">Account</div>
                    </div>

                </div>
            </div>

        </div>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import authentication_api from "../api/authentication_api";
import { useRouter } from "vue-router";

const showMenu = ref(false)

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}


const router = useRouter()
const LogOut = () => {
    console.log("Log Out")
    authentication_api.logout()
    router.push({ name: "Login" })

}

</script>