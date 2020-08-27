export interface CommentInterface {
    id?: string;
    uid?: string;
    parentID?:string;
    parentUID?:string;
    parentTitle?:string;
    docID?: string;
    docUID?: string;
    owner?: string;
    content?: string;
    date?: number;
}

