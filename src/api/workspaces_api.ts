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


const createWorkspace = async (workspace: Workspace): Promise<Workspace> => {
    const { data, error } = await supabase.from('workspace').insert(workspace).select().single();
    if (error) {
        throw error;
    }
    return data as Workspace;
}





export default {
    getWorkspaces,
    createWorkspace
}