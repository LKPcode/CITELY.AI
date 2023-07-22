
<template>

  <div class="mt-4 ">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <!-- <h1 class=" text-base font-semibold leading-6 text-gray-900">Library</h1> -->
        <p class="mt-2 text-sm text-grayest">A list of all papers of the workspace</p>
      </div>
      <div class="flex items-center rounded-md border border-accent cursor-pointer">
        <button @click="addPapers" type="button" class="block  px-3 py-1.5 text-center text-sm leading-6 text-grayest shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          Search for papers to add
        </button>
        <svg class="mx-2  h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <div class="mt-4 flow-root ">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative overflow-auto h-[600px]">
            
            <table class="min-w-full table-fixed divide-y divide-gray-300">

              <thead class="">
                
                <tr class="bg-white z-20">
                  <th scope="col" class=" px-7 sm:w-12 sm:px-6 sticky top-0 bg-white z-20">
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" :checked="indeterminate || selectedPapers.length === paper_store.paper_list.value.length" :indeterminate="indeterminate" @change="selectedPapers = $event.target.checked ? paper_store.paper_list.value.map((p) => p.id) : []" />
                  </th>
                  <th scope="col" class="min-w-[12rem]  py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">
                    <div class="relative">
                        Title
                        <div v-if="selectedPapers.length > 0" class="absolute mt-[-10px] top-0 z-30 flex h-10 items-center space-x-3  bg-white ">
                          <!-- <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Bulk edit</button> -->
                          <button type="button" @click="removeFromLibrary" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Delete all</button>
                        </div>
                    </div>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Published</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Authors</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Status</th>
                  <th scope="col" class=" py-3.5 pl-3 pr-4 sm:pr-3 sticky top-0 bg-white z-20">
                    <span class="sr-only">Open</span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 bg-white overflow-scroll ">
                <tr @click="paper_store.selectPaper(paper)" v-for="paper in paper_store.paper_list.value" :key="paper.id" class="cursor-pointer hover:bg-gray-50" :class="[selectedPapers.includes(paper.id) && 'bg-gray-50', paper_store.selected_paper.value?.id == paper.id && 'bg-gray-50']">
                  <td class="relative px-7 sm:w-12 sm:px-6">
                    <div v-if="selectedPapers.includes(paper.id)" class="absolute inset-y-0 left-0 w-0.5 bg-accent"></div>
                    <input @click.stop type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" :value="paper.id"  v-model="selectedPapers" />
                  </td>
                  <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium ', selectedPapers.includes(paper.id) ? 'text-accent' : 'text-gray-900']">
                      <div class="w-[400px] truncate">
                          {{ paper.title }}
                      </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ paper.published_at }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-[200px] truncate">
                    {{  }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    ready
                  </td>
                 
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <a href="#" class="text-accent hover:text-indigo-900">
                      Open<span class="sr-only">, {{ paper.title }}</span>
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
import { ref, computed, onMounted } from 'vue'
import paper_api from '../api/papers_api';
import usePaperStore from '../store/paperStore';
import { useRoute } from "vue-router"
import { useRouter } from 'vue-router'

const router = useRouter()

const addPapers = () => router.replace({ name: 'SearchView' })


const route = useRoute()
let workspace_id = route.params.workspace_id as string

const paper_store = usePaperStore()


const selectedPapers = ref<any>([])


//get papers on Mounted

onMounted( async () => {
  let temp_papers = await paper_api.getPapersOfWorkspace(workspace_id)
  paper_store.initPaperList(temp_papers)   
})

const indeterminate = computed(() => selectedPapers.value.length > 0 && selectedPapers.value.length < paper_store.paper_list.value.length)




//   const addNewPaper = async () => {
//     console.log("Add new paper")
//     let new_paper = await paper_api.createPaper({
//         title: `Sia Kosioni C`, 
//         workspace_id: workspace_id,
//         author: "Bill Vinyl",
//         published_at: null

//     })
//     paper_store.addPaper(new_paper)
// }

const removeFromLibrary = async () => {
  try{
    await paper_api.deletePapersOfWorkspace(selectedPapers.value)
    paper_store.removePapers(selectedPapers.value)
  }catch(error){
    console.log(error)
  }
}

</script>






