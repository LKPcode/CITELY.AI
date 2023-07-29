<template>

   
    <!-- Worksapces -->
    <div class="h-full flex flex-col">
        <h1 class="text-center">Very COOL Home Page</h1>
        <div class="uppercase text-center font-bold text-sm text-slate-600 my-2 ">
            Workspaces
        </div>
        <div class="grow overflow-auto hide-scrollbar">

            <TransitionGroup name="enter">
                <div v-for="workspace in workspace_store.workspace_list.value" :key="workspace.id"
                    class="flex items-center p-2  rounded-xl cursor-pointer"
                    :class="[workspace.id === selected_workspace?.id ? 'bg-lightgray' : 'hover:bg-zinc-100']"
                    @click="goToWorkspace(workspace)">
                    <img src="../components/icons/Workspace.svg" class="w-7 ml-2" alt="Add Paper">
                    <div class="ml-4 text-sm grow font-semibold">
                        {{ workspace.name }}
                    </div>
                </div>
            </TransitionGroup>
        </div>

        <div @click="createNewWorkspace"
            class="flex items-center p-2 mb-4 bg-cyan-50 hover:bg-cyan-100  rounded-xl cursor-pointer  ">
            <img src="../components/icons/NewChat.svg" class="w-7 ml-2" alt="Add Paper">
            <div class="ml-4 text-sm grow font-semibold">
                New Workspace
            </div>
        </div>
    </div>
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

const workspace_store = useWorkspaceListStore()
const paper_store = usePaperStore()
const source_store = useSourceStore()
const chat_store = useChatStore()

let { selected_workspace } = workspace_store

onMounted(async () => {
    clearAllStores()
    let temp_list = await workspace_api.getWorkspaces()
    workspace_store.initWorkspaceList(temp_list)

})


const router = useRouter()
const goToWorkspace = (workspace: Workspace) => {
    router.push({ name: "WorkspaceView", params: { workspace_id: workspace.id } })
}


const createNewWorkspace = async () => {
    console.log("Create new workspace")
    const new_workspace = await workspace_api.createWorkspace({ name: `Workspace ${workspace_store.workspace_list.value.length + 1}` })
    workspace_store.addWorkspace(new_workspace)
    goToWorkspace(new_workspace)
}


const clearAllStores = () => {
    paper_store.clearPaper()
    source_store.clearSource()
    chat_store.clearChat()
}




</script>

<style scoped>
.enter-enter-active,
.enter-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.enter-enter-from,
.enter-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}
</style>