import { ref } from 'vue'
import { Paper } from '../types';

const paper_list = ref<Paper[]>([])

const selected_paper = ref<Paper | null>(null)

export default function usePaperStore () {
  
  const initPaperList = (papers: Paper[]) => {
    paper_list.value = papers
  }

  const selectPaper = (paper: Paper) => {
    selected_paper.value = paper
    
  }

  const addPaper = (paper: Paper) => {
    paper_list.value.unshift(paper)
  }

  const removePapers = (paper_ids: string[]) => {
    let all_filtered_papers = paper_list.value.filter((paper) => {
      return !paper_ids.includes(paper.id as string)
    })

    initPaperList(all_filtered_papers)
   
  }



  return {
    paper_list,
    selected_paper,
    initPaperList,
    selectPaper,
    addPaper,
    removePapers
  }
}
