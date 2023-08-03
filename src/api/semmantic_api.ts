import supabase from './supabase_instance'



const queryPapers = async (query: string, page_num:number = 0) => {
    
const { data, error } = await supabase.functions.invoke('semmantic-api', {
    body: {query, page_num}
  })

    if (error) {
        throw error
    }

    return data
}

const addPaperToWorkspace = async (paper: any, workspace_id: string) => {
    const { data, error } = await supabase.functions.invoke('add_paper_to_workspace', {
        body: {paper, workspace_id}
    })


    if (error) {
       throw error
    }

    return data
}



export default {
  queryPapers,
  addPaperToWorkspace
}