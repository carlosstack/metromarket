export interface AnswerInterface {
    id?: string;
    qid?: string;
    questionTitle?:string;
    quid?: string;
    uid?: string;
    owner?: string;
    content?: string;
    date?: number;
    votes?: {};
    votesCount?: number;
    commentsCount?:number;
}

