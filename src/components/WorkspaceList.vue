<template>

<div class="">

<div class="border-b max-w-4xl mx-auto border-gray-200 pb-5 sm:flex sm:items-center sm:justify-end">
    <!-- <h2 class="text-xl font-semibold leading-6 text-gray-900">Workspaces</h2> -->
    <div class="mt-3 sm:ml-4 sm:mt-0">
      <button @click="createNewWorkspace" type="button" class="inline-flex items-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z" fill="#FFF"/>
            </svg>
        Create new Workspace
    </button>
    </div>
  </div>

</div>





    <ul role="list" class="divide-y divide-gray-100 overflow-y-auto overflow-x-hidden mb-24">
    <TransitionGroup name="list" tag="ul">
      <li v-for="workspace in workspace_store.workspace_list.value" :key="workspace.id" class="relative py-5 hover:bg-gray-50">
        <RouterLink :to="{ name: 'WorkspaceView', params: { workspace_id: workspace.id } }">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mx-auto flex max-w-4xl justify-between gap-x-6">
            <div class="flex gap-x-4">
              <img class="h-8 w-8 flex-none rounded-full bg-gray-50" src="../components/icons/Answer.svg" alt="" />
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <div>
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ workspace.name }}
                  </div>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-gray-500">
                  <div class="relative truncate hover:underline"> Description </div>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-gray-900"> Working with {{ workspace.paper_num }} papers</p>
                <p class="mt-1 text-xs leading-5 text-gray-500">
                    Created <time :datetime="workspace.created_at">  {{ formatDateRelativeToCurrent(workspace.created_at) }}</time>
                </p>
                
              </div>
              <img class="w-5 h-5 stroke-slate-500" src="./icons/RightArrow.svg" alt="">
            </div>
          </div>
        </div>
    </RouterLink>
      </li>
        </TransitionGroup>
    </ul>
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from 'vue'
import useWorkspaceListStore from '../store/workspaceStore';
import useChatStore from '../store/chatStore';
import usePaperStore from '../store/paperStore';
import useSourceStore from '../store/sourcesStore';
import workspace_api from '../api/workspaces_api';
import { Workspace } from '../types';
import { useRouter } from 'vue-router';
import formatDateRelativeToCurrent from "../helper_functions/datetime"

const workspace_store = useWorkspaceListStore()


let { selected_workspace } = workspace_store

onMounted(async () => {
    clearAllStores()
    let workspaces = await workspace_api.getWorkspaces()
    workspace_store.initWorkspaceList(workspaces)

})


const router = useRouter()
const goToWorkspace = (workspace: Workspace) => {
    router.push({ name: "WorkspaceView", params: { workspace_id: workspace.id } })
}


const createNewWorkspace = async () => {
    console.log("Create new workspace")
    const new_workspace = await workspace_api.createWorkspace({ name: `Workspace ${workspace_store.workspace_list.value.length + 1}` })
    workspace_store.addWorkspace(new_workspace)
    // goToWorkspace(new_workspace)
}



const paper_store = usePaperStore()
const source_store = useSourceStore()
const chat_store = useChatStore()
const clearAllStores = () => {
    paper_store.clearPaper()
    source_store.clearSource()
    chat_store.clearChat()
}



  </script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>