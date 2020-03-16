export interface OfertInterface {

    id?: string;
    payForms?: [{}];
    payFormsAb?:[{}];
    from?: string;
    currencyAmount?: string;
    dateDelivery?: string;
    amountMin?: number;
    amountMax?: number;
    type?: string;
    rate?: number;
    owner?: string;
    ownerUID?: string;
    status?: string;
    acceptedBy?: string;
    acceptedByUID?: string;
    ownerPhotoUrl?:string;
    date?: number;
    phoneNumber?:string

}

export interface OfertChangeInterface {

    id?: string;
    from?: string;
    fromCurrency?: string;
    toCurrency?: string;
    dateDelivery?: string;
    amountToChange?: number;
    amountToReceive?: number;
    fee?: number;
    type?: string;
    owner?: string;
    ownerUID?: string;
    status?: string;
    acceptedBy?: string;
    acceptedByUID?: string;
    date?: number;
    ownerPhotoUrl?:string;
    payForms?: [{}];
    payFormsAb?:[{}];
    phoneNumber?:string
    
}
