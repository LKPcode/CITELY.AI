import supabase from './supabase_instance'



const queryPapers = async (query: string) => {
    
const { data, error } = await supabase.functions.invoke('semmantic-api', {
    body: {query}
  })

    if (error) {
        console.log(error)
    }

    return data
}



export default {queryPapers}