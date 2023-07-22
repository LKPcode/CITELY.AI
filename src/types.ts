
interface Workspace {
    id?: string;
    name: string;
    created_at?: string;
}

interface Chat {
    id?: string;
    name: string;
    created_at?: string;
    workspace_id: string;
}


interface Paper {
    id?: string;
    title: string;
    created_at?: string;
    workspace_id: string;
    abstract?: string;
    authors: any[];
    paper_url?: string;
    published_at:null;
    publication_venue: string;
    status: string;
    semantic_id?: string;
    pdf_path?: string;
    paper_url?: string;
}

interface Source {
    title: string,
    paper_id?: string;
    published_at?: string;
    section: string,
    passage: string
}


export type {
    Workspace,
    Chat,
    Paper
}

