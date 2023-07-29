<template>
  
<div  class="relative z-40 overflow-hidden" role="dialog" aria-modal="true">
  
  <div class="fixed  inset-0 bg-gray-500 bg-opacity-25 transition-opacity backdrop-blur-sm"></div>

  <div  @click.self="goToLibrary" class="fixed inset-0 z-10 overflow-y-hidden p-4 sm:p-6 md:p-20">

    
    <div :class="{'max-w-[90%]': search_bar_expanded, 'max-w-[40%]': !search_bar_expanded}"
         @keydown.enter="search_bar_expanded = true"
         class="mx-auto  transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all duration-700">
      <div class="relative flex">
        <!-- <img src="./icons/Search.svg" class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" alt=""> -->
        <svg class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
        </svg>
        <input ref="search_field" v-model="search_query" 
                @keypress.enter="search(0)"

        type="text" class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search for Title or Describe paper" role="combobox" aria-expanded="false" aria-controls="options">
        <img v-if="searching" class="w-6 text-accent animate-spin mr-3" src="../components/icons/Loading.svg" alt="">
    </div>

      <!-- Results, show/hide based on command palette state -->
    <ul :class="{'h-[70vh]': search_bar_expanded, 'h-[0vh]': !search_bar_expanded}"
        class="transition-all delay-700 duration-700 overflow-auto px-4   text-sm text-gray-800" id="options" role="listbox">
      
       <PaperSearchList :papers="papers" />
    </ul>


      <!-- Empty state, show/hide based on command palette state -->
      <!-- <p class="p-4 text-xs text-gray-500">
        Select papers to ad to Workspace 1
      </p> -->

      <PaperSearchNavigation v-if="search_bar_expanded" 
                              :page_num="page_num" 
                              :total_papers="total_papers"
                              @nextPage="navigatePaperList(page_num+=1)" 
                              @previousPage="navigatePaperList(page_num-=1)" />
    </div>
  </div>
</div>

</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import PaperSearchList from './PaperSearchList.vue';
import PaperSearchNavigation from './PaperSearchNavigation.vue';
import { useRouter } from 'vue-router'

// import res from './schollar_api.json'

import semmantic_api from "../api/semmantic_api.ts"


// On mount, focus the search field
const search_field = ref<any>(null)
onMounted(() => {
  if (search_field.value)
    search_field.value.focus()
})


const papers = ref<any[]|null>([])

const search_query = ref('')
const search_bar_expanded = ref(false)
const searching = ref(false)
const page_num = ref(0)
const total_papers = ref(0)


const search = async (page_num:number=0) => {
    searching.value = true
    try {
        papers.value = null
        const res = await semmantic_api.queryPapers(search_query.value, page_num)
        if(res.total == 0) {
            console.log('no papers found')
            papers.value = []
        }
        else{
          papers.value = res.data
        }
        console.log(res)
        total_papers.value = res.total
        searching.value = false
    } catch (error) {
        console.log(error)
        papers.value = []
    } finally {
        searching.value = false
    }
}

const navigatePaperList = (navigate_to_page_num:number) => {
    console.log('navigatePaperList')
    search(navigate_to_page_num)
}


const router = useRouter()
const goToLibrary = () => {
    console.log('goToLibrary')
    router.replace({ name: 'WorkspaceView' })
}

// import { ref } from 'vue'

// const search = ref('')




</script>