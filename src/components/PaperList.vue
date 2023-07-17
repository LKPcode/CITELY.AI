
<template>
    <div class="mt-4 ">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <!-- <h1 class=" text-base font-semibold leading-6 text-gray-900">Library</h1> -->
          <p class="mt-2 text-sm text-grayest">A list of all papers of the workspace</p>
        </div>
        <div class="">
          <button type="button" class="block rounded-md bg-accent px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Add Papers</button>
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
                      <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" :checked="indeterminate || selectedPeople.length === papers.length" :indeterminate="indeterminate" @change="selectedPeople = $event.target.checked ? papers.map((p) => p.title) : []" />
                    </th>
                    <th scope="col" class="min-w-[12rem]  py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">
                      <div class="relative">
                          Title
                          <div v-if="selectedPeople.length > 0" class="absolute mt-[-10px] top-0 z-30 flex h-10 items-center space-x-3  bg-white ">
                            <!-- <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Bulk edit</button> -->
                            <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Delete all</button>
                          </div>
                      </div>
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Published</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sticky top-0 bg-white z-20">Authors</th>
                    <th scope="col" class=" py-3.5 pl-3 pr-4 sm:pr-3 sticky top-0 bg-white z-20">
                      <span class="sr-only">Open</span>
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-200 bg-white overflow-scroll ">
                  <tr v-for="paper in papers" :key="paper.title" class="cursor-pointer hover:bg-gray-50" :class="[selectedPeople.includes(paper.title) && 'bg-gray-50']">
                    <td class="relative px-7 sm:w-12 sm:px-6">
                      <div v-if="selectedPeople.includes(paper.title)" class="absolute inset-y-0 left-0 w-0.5 bg-accent"></div>
                      <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" :value="paper.title"  v-model="selectedPeople" />
                    </td>
                    <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium ', selectedPeople.includes(paper.title) ? 'text-accent' : 'text-gray-900']">
                        <div class="w-[400px] truncate">
                            {{ paper.title }}
                        </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ paper.published_date }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {{ paper.authors }}
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
  import { ref, computed } from 'vue'
  
  const papers = [
    {
      title: 'The Art of Doing Science and Engineering: Learning to',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    {
      title: 'The Art of Doing Science and Engineering: Learning ',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    {
      title: 'The Art of Doing Science and Engineering: ',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    {
      title: 'The Art of Doing Science and Engineering: Learning to Lea',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    {
      title: 'The Art of Doing Science and Engineering',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    {
      title: 'The Art of Doing Science and Engineering: Learning to Learn',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    {
      title: 'The Art of Doing ',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },  
    {
      title: 'The Art of Doing Science and Engineering: Learning ',
      published_date: '2021-01-01',
      authors: 'Richard W. Hamming',
    },
    

  ]
  
  const selectedPeople = ref<any>([])

//   const updateSelected = (event:any, title:any) => {
//     console.log(event.target.checked)
//     if (event.target.checked) {
//       selectedPeople.value.push(title)
//     } else {
//       selectedPeople.value = selectedPeople.value.filter((titl:any) => titl !== title)
//     }
//   }

  const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < papers.length)
  </script>