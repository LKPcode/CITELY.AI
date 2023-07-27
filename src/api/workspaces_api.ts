import supabase from './supabase_instance';
import { Workspace } from '../types';



const getWorkspaces = async (): Promise<Workspace[]> => {
    const { data, error } = await  supabase.from('workspace')
                                    .select('*')
                                    .order('created_at', { ascending: false });
    if (error) {
        throw error;
    }
    return data as Workspace[];
}

const getWorkspace = async (workspace_id: string): Promise<Workspace> => {
    const { data, error } = await supabase.from('workspace').select('*').match({ id: workspace_id }).single();
    if (error) {
        throw error;
    }
    return data as Workspace;
}


const createWorkspace = async (workspace: Workspace): Promise<Workspace> => {
    const { data, error } = await supabase.from('workspace').insert(workspace).select().single();
    if (error) {
        throw error;
    }
    return data as Workspace;
}


const deleteWorkspace = async (workspace_id: string): void => {   
    const { data, error } = await supabase.from('workspace').delete().match({ id: workspace_id })
    
    if (error) {
        throw error;
    }
}




export default {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
    deleteWorkspace
}