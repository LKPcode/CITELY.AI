import { ref } from 'vue'
import { Source } from '../types';


const source_list = ref<Source[]>([])

const selected_source = ref<Source | null>(null)

export default function useSourceStore() {

    const initSourceList = (sources: Source[]) => {
        source_list.value = sources
      }


    const selectSource = (source: Source) => {
        selected_source.value = source 
    }

    return {
        source_list,
        selected_source,
        selectSource,
        initSourceList
    }

}

