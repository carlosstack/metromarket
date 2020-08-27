export interface QuestionInterface{
    id?:string;
    title ?:string;
    description ?:string;
    tags?:string[];
    date ?: number;
    ownerUID?:string;
    owner?:string;
    answers?:number;
    votes?:{};
    votesCount?: number;
    commentsCount?:number;
}
