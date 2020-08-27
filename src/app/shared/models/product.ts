export interface ProductInterface{
    id ?: string;
    title ?:string;
    productSearch?:string[];
    description ?:string;
    price ?: number;
    currency?:string;
    category ?: string;
    owner_id ?:string;
    galery?:Array<string>;
    status?:string;
    quality?:string;
    date ?: number;
}