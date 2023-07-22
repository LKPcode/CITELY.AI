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

  const getPaper = async (paper_id: string): Promise<Paper> => {
    const { data, error } = await supabase.from('paper')
      .select('*')
      .eq('id', paper_id)
      .single();

    if (error) {
      throw error;
    }

    return data as Paper;
  }

  const downloadPDF = async (paper_path: string): Promise<Blob> => {
    const { data, error } = await supabase.storage
      .from('papers')
      .download(paper_path);

    if (error) {
      throw error;
    }

    // Convert to Object URL
    const blob = new Blob([data as BlobPart], { type: 'application/pdf' });
    const objectURL = URL.createObjectURL(blob);

    return objectURL;
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
    deletePapersOfWorkspace,
    getPaper,
    downloadPDF
  }