import { ref } from 'vue'
import { Workspace } from '../types';
import { useRouter } from 'vue-router';

const workspace_list = ref<Workspace[]>([])

const selected_workspace = ref<Workspace | null>(null)


export default function useWorkspaceListStore() {

    const router = useRouter()

    const initWorkspaceList = (workspaces: Workspace[]) => {
        workspace_list.value = workspaces
    }

    const addWorkspace = (workspace: Workspace) => {
        workspace_list.value.unshift(workspace)
    }   

    const selectWorkspace = (workspace: Workspace) => {
        selected_workspace.value = workspace;
    }

    const clearWorkspace = () => {
        selected_workspace.value = null;
        initWorkspaceList([]);
    }

    return {
        workspace_list,
        selected_workspace,
        initWorkspaceList,
        addWorkspace,
        selectWorkspace,
        clearWorkspace
    }
}