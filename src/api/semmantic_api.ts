import supabase from './supabase_instance'



const queryPapers = async (query: string, page_num:number = 0) => {
    
const { data, error } = await supabase.functions.invoke('semmantic-api', {
    body: {query, page_num}
  })

    if (error) {
        console.log(error)
    }

    return data
}



export default {queryPapers}