<template>
    <ul role="list" class="divide-y divide-grayer ">

        <li v-for="paper in papers" class="flex items-center justify-between gap-x-6 py-5">
            <div class="min-w-0">
                <div class="flex items-start gap-x-3">
                    <p class="text-sm font-semibold leading-6 text-gray-900 ">
                        {{ paper.title }}
                    </p>
                    <!-- <p
                        class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">
                        Complete</p> -->
                </div>
                <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p class="whitespace-nowrap"> Published <span >{{paper.publicationDate}}</span></p>
                    <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                        <circle cx="1" cy="1" r="1" />
                    </svg>
                    <p class="truncate w-[60%]">
                        Authors:
                        <span v-for="author in paper.authors" class="hover:underline cursor-pointer font-medium">{{ author.name}},  </span>
                    </p>
                    <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                        <circle cx="1" cy="1" r="1" />
                    </svg>

                </div>
                <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 cursor-pointer">
                    <a :href="paper.openAccessPdf.url"
                    target=”_blank”
                        class="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                        <div class="">PDF</div>
                        <button type="button" class=" relative -mr-1 h-3.5 w-3.5 rounded-sm">
                            <img src="../components/icons/ExternalLink.svg" alt="">
                            <span class="absolute -inset-1"></span>
                        </button>
                    </a>

                    <p>
                       {{ paper?.publicationVenue?.name }}
                    </p>

                    <span v-for="pubType in paper.publicationTypes" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{{pubType}}</span>


                </div>
            </div>
            <div class="flex flex-none items-center gap-x-4">
                <a href="#"
                    class=" rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                    Add to Workspace
                </a>
            </div>


        </li>

</ul>





</template>

<script setup lang="ts">

const { papers } = defineProps<{
    papers: any
}>()

</script>