import supabase from './supabase_instance';
import { Paper } from '../types';

const getPapersOfWorkspace = async (workspace_id: string): Promise<Paper[]> => {
    const { data, error } = await supabase.from('paper')
      .select('*')
      .eq('workspace_id', workspace_id)
    
    if (error) {
      throw error;
    }
    
    return data as Paper[];
  }

  const createPaper = async (paper: Paper): Promise<Paper> => {
    const { data, error } = await supabase.from('paper')
      .insert(paper)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as Paper;
  }

  const deletePapersOfWorkspace = async (paper_ids: string[]) => {
    const {error} = await supabase.from("paper").
    delete().
    in('id', paper_ids )

    if (error) {
        throw error;
    }
    
  }


  export default {
    getPapersOfWorkspace,
    createPaper,
    deletePapersOfWorkspace
  }