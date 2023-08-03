
<template>
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-accent focus:outline-none focus:ring-accent sm:text-sm">
          <option v-for="tab in tabs"  :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
        </select>
      </div>
      <div class="hidden sm:block mx-3">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8 mt-1" aria-label="Tabs">
            <a  v-for="tab in tabs"
                class="cursor-pointer font-bold" 
                :key="tab.name" 
                :class="[tab.current ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium']" 
                :aria-current="tab.current ? 'page' : undefined"
                @click="selectTab(tab)"
                >
             
             {{ tab.name }}
            
            </a>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type {Tab} from "../types"

  

  const emit = defineEmits(['selectTab'])
  
    const {tabs} = defineProps<{
        tabs: Tab[]
    }>();

  const selectTab = (tab: Tab) => {
    emit('selectTab', tab)
  }

  </script>