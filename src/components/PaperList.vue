
<template>
  <div class="mt-4 ">
    <div class="sm:flex sm:items-center mb-8">
      <div class="sm:flex-auto">
        <h1 class=" ml-4 text-xl font-semibold leading-1 text-gray-900">Library</h1>
      </div>

        <RouterLink :to="{name: 'SearchView'}" type="button"
            class=" pl-3 py-1.5 flex items-center rounded-md border border-accent cursor-pointer text-center text-sm leading-6 text-grayest shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <span>Add Papers to Workspace</span> 
       
          <svg class="mx-2  h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clip-rule="evenodd" />
          </svg> 
          <!-- <svg class="mx-2  h-6 w-6 text-accent" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z" fill="#222222"/>
          </svg> -->

      </RouterLink> 


    </div>

    <div class="mt-4 flow-root ">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative overflow-auto h-[600px]">

            <table class="min-w-full table-fixed divide-y divide-gray-300">

              <thead class="">

                <tr class="bg-white z-20">
                  <th scope="col" class=" px-7 sm:w-12 sm:px-6 sticky top-0 bg-white z-20">
                    <input type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                      :checked="indeterminate || selectedPapers.length === paper_store.paper_list.value.length"
                      :indeterminate="indeterminate"
                      @change="selectedPapers = $event.target?.checked ? paper_store.paper_list.value.map((p) => p.id) : []" />
                  </th>
                  <th scope="col"
                    class="min-w-[12rem]  py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">
                    <div class="relative">
                      Title
                      <div v-if="selectedPapers.length > 0"
                        class="absolute mt-[-10px] top-0 z-30 flex h-10 items-center space-x-3  bg-white ">
                        <!-- <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Bulk edit</button> -->
                        <button type="button" @click="removeFromLibrary"
                          class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
                          Delete Selected
                        </button>
                      </div>
                    </div>
                  </th>
                  <th scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Published
                  </th>
                  <th scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20 w-[200px]">
                    Authors
                  </th>
                  <th scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Status
                  </th>
                  <th scope="col" class=" py-3.5 pl-3 pr-4 sm:pr-3 sticky top-0 bg-white z-20">
                    <span class="sr-only">
                      Open
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 bg-white overflow-scroll ">
                <tr @click="paper_store.selectPaper(paper)"
                    @dblclick="viewPDF(paper.id as string)"
                    v-for="paper in paper_store.paper_list.value" :key="paper.id"
                  class="cursor-pointer hover:bg-gray-50"
                  :class="[selectedPapers.includes(paper.id) && 'bg-gray-50', paper_store.selected_paper.value?.id == paper.id && 'bg-gray-50']">
                  <td class="relative px-7 sm:w-12 sm:px-6">
                    <div v-if="selectedPapers.includes(paper.id)" class="absolute inset-y-0 left-0 w-0.5 bg-accent"></div>
                    <input @click.stop type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                      :value="paper.id" v-model="selectedPapers" />
                  </td>
                  <td
                    :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium ', selectedPapers.includes(paper.id) ? 'text-accent' : 'text-gray-900']">
                    <div class="max-w-[400px] truncate">
                      {{ paper.title }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ paper.published_at }}
                  </td>
                  <td class="max-w-[100px] truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ paper.authors.map((a) => a.name).join(', ') }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      v-if="paper.status == 'ready'"
                      class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Ready
                    </span>
                    <span
                      v-else-if="paper.status == 'processing'"
                      class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      Processing...
                    </span>
                  </td>

                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <a @click.stop="viewPDF(paper.id as string)" class="text-accent hover:text-accent/80">
                      View PDF<span class="sr-only">, {{ paper.title }}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import paper_api from '../api/papers_api';
import usePaperStore from '../store/paperStore';
import { useRoute, useRouter } from "vue-router"
import useSourceStore from '../store/sourcesStore';


const router = useRouter()

const route = useRoute()
let workspace_id = route.params.workspace_id as string

const paper_store = usePaperStore()

const selectedPapers = ref<any>([])


const indeterminate = computed(() => selectedPapers.value.length > 0 && selectedPapers.value.length < paper_store.paper_list.value.length)


const removeFromLibrary = async () => {
  try {
    await paper_api.deletePapersOfWorkspace(selectedPapers.value)
    paper_store.removePapers(selectedPapers.value)
  } catch (error) {
    console.log(error)
  }
}

const sources_store = useSourceStore()
const viewPDF = (paper_id: string) => {
  // Clear the sources 
  sources_store.initSourceList([])
  router.push({ name: 'PaperReaderView', params: { workspace_id: workspace_id, paper_id: paper_id } })
}

</script>






