export interface OfertInterface {
    
    id?: string;
    date?: number;
    payForms?: [{}];
    payFormsAb?:[{}];
    from?: string;
    type?: string;

    status?: string;
    statusOwner?:string;
    statusAcceptedBy?:string;

    amountToSend?: number;
    currencyAmountToSend?: string;

    amountToReceive?:number;
    currencyAmountToReceive?:string;

    rate?:number;
    currencyRate?:string;

    owner?: string;
    ownerUID?: string;
    ownerPhotoUrl?:string;
    ownerRating?:number;
    ownerRatingCount?:number;

    acceptedBy?: string;
    acceptedByUID?: string;
    acceptedByPhotoUrl?:string;
    acceptedByRating?:number;
    acceptedByRatingCount?:number;
}


