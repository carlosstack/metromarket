export interface UserInterface{
    uid ?: string;
    firstName ?:string;
    lastName?:string;
    address?:string;
    dni?:string;
    gender?:string;
    phone_number ?: string;
    photoUrl ?: string;
    rating ?: number;
    rating_count ?: number;
    verified ?: boolean;
}
export interface UserVerificationInterface{
    uid ?: string;
    firstName ?:string;
    lastName?:string;
    address?:string;
    gender?:string;
    dni?:string;
    dniCaptureURL?:string;
    phone_number ?: string;
}