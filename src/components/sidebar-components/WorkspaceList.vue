<template>
    <!-- Worksapces -->
    <div class="h-full flex flex-col">
        <div class="uppercase text-center font-bold text-sm text-slate-600 my-2 ">
            Workspaces
        </div>
        <div class="grow overflow-auto hide-scrollbar">

            <TransitionGroup name="enter">
                <div v-for="workspace in workspace_store.workspace_list.value" :key="workspace.id"
                    class="flex items-center p-2  rounded-xl cursor-pointer"
                    :class="[workspace.id === selected_workspace?.id ? 'bg-lightgray' : 'hover:bg-zinc-100']"
                    @click="goToWorkspace(workspace)">
                    <img src="../../components/icons/Workspace.svg" class="w-7 ml-2" alt="Add Paper">
                    <div class="ml-4 text-sm grow font-semibold">
                        {{ workspace.name }}
                    </div>
                </div>
            </TransitionGroup>
        </div>

        <div @click="createNewWorkspace"
            class="flex items-center p-2 mb-4 bg-cyan-50 hover:bg-cyan-100  rounded-xl cursor-pointer  ">
            <img src="../../components/icons/NewChat.svg" class="w-7 ml-2" alt="Add Paper">
            <div class="ml-4 text-sm grow font-semibold">
                New Workspace
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import useWorkspaceListStore from '../../store/workspaceStore';
import workspace_api from '../../api/workspaces_api';
import { Workspace } from '../../types';
import { useRoute, useRouter } from 'vue-router';

const workspace_store = useWorkspaceListStore()

let { selected_workspace } = workspace_store

const route = useRoute()
onMounted(async () => {
    let workspace_id = route.params.workspace_id as string

    let temp_list = await workspace_api.getWorkspaces()
    workspace_store.initWorkspaceList(temp_list)
    // Select workspace if workspace_id is provided by route, else select first workspace
    if (workspace_id) {
        let workspace = temp_list.find(workspace => workspace.id == workspace_id)
        if (workspace) {
            workspace_store.selectWorkspace(workspace)
        } else {
            console.log("Workspace not found")
            // workspace_store.selectWorkspace(temp_list[0])
            goToWorkspace(temp_list[0])
        }
    }
})

// When route changes, select workspace, if workspace_id is provided by route else select first workspace
watch(() => route.params.workspace_id, (workspace_id) => {

    if (workspace_id) {
        let workspace = workspace_store.workspace_list.value.find(workspace => workspace.id == workspace_id)
        if (workspace) {
            workspace_store.selectWorkspace(workspace)
        } else {
            console.log("Workspace not found")
            // workspace_store.selectWorkspace(workspace_store.workspace_list.value[0])
            goToWorkspace(workspace_store.workspace_list.value[0])
        }
    }
})


const router = useRouter()
const goToWorkspace = (workspace: Workspace) => {
    router.push({ name: "EmptyMainBar", params: { workspace_id: workspace.id } })
}


const createNewWorkspace = async () => {
    console.log("Create new workspace")
    const new_workspace = await workspace_api.createWorkspace({ name: `Workspace ${workspace_store.workspace_list.value.length + 1}` })
    workspace_store.addWorkspace(new_workspace)
    goToWorkspace(new_workspace)
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