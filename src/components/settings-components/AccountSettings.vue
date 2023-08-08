<template>

<div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <h2 class="text-base mt-0 font-semibold leading-7 text-gray-900">Profile</h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>

        <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">
                Unknown
                <span class ="text-xs text-gray-400">
                    ( {{ user_store.user.value?.user_id }} )
                </span>

              </div>
              <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">{{ user_store.user.value?.email }}</div>

            </dd>
          </div>
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Subscription Tier</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class=" uppercase font-bold text-accent"> {{  user_store.user.value?.subscription_plan }} </div>
              <button type="button" class="font-semibold text-gray-400 hover:text-red-500">Unsubscribe</button>
            </dd>
          </div>
         
        </dl>
      </div>
    </div>


<div class="mx-auto mt-16 max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <h2 class="text-base font-semibold leading-7 text-gray-900">Actions</h2>
        <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>

        <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Log Out</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">Log out from your account</div>
              <button @click="logout" type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Log Out</button>
            </dd>
          </div>

          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Change Password</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900 grow mr-12">
                <input id="new-password" name="new_password" type="password" autocomplete="new-password" placeholder="New Password" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-accent text-sm ">

              </div>
              <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Change Password</button>
            </dd>
          </div>

          <div class="pt-6 sm:flex">
            <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Delete Account</dt>
            <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div class="text-gray-900">Permanently delete your account, all data will be lost</div>
              <button type="button" class="font-semibold text-red-600 hover:text-red-500">Delete</button>
            </dd>
          </div>
         
        </dl>
      </div>
    </div>



    <!-- <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16 md:grid-cols-3">
          <div>
            <h2 class="text-base mt-0 font-semibold leading-7 text-black">Change password</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">Update your password associated with your account.</p>
          </div>

          <form class="md:col-span-2">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div class="col-span-full">
                <label for="current-password" class="block text-sm font-medium leading-6 text-black">Current password</label>
                <div class="mt-2">
                  <input id="current-password" name="current_password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="col-span-full">
                <label for="new-password" class="block text-sm font-medium leading-6 text-black">New password</label>
                <div class="mt-2">
                  <input id="new-password" name="new_password" type="password" autocomplete="new-password" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div class="col-span-full">
                <label for="confirm-password" class="block text-sm font-medium leading-6 text-black">Confirm password</label>
                <div class="mt-2">
                  <input id="confirm-password" name="confirm_password" type="password" autocomplete="new-password" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
                </div>
              </div>
            </div>

            <div class="mt-8 flex">
              <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
            </div>
          </form>
    </div> -->



    <!-- <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-16  md:grid-cols-3">
          <div>
            <h2 class="text-base mt-0  font-semibold leading-7 text-black">Log out</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">Please enter your password to confirm you would like to log out of your other sessions across all of your devices.</p>
          </div>

          <form class="flex items-start md:col-span-2">
            <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Log Out</button>

          </form>
        </div>

        <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10  py-16 md:grid-cols-3 ">
          <div>
            <h2 class="mt-0 text-base font-semibold leading-7 text-black">Delete account</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</p>
          </div>

          <form class="flex items-start md:col-span-2">
            <button type="submit" class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400">Yes, delete my account</button>
          </form>
        </div> -->

</template>

<script setup lang="ts">
import authentication_api from '../../api/authentication_api'
import useUserStore from '../../store/UserStore'
import { onMounted } from 'vue'

const user_store = useUserStore()



const logout = () => {
    authentication_api.logout()
}

</script>