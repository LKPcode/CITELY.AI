
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
    published_at:null;
    status: string;
}


export type {
    Workspace,
    Chat,
    Paper
}

