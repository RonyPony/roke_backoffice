export interface Branch {
    id: string;
    status: BranchStatus;
    sucursal: string;
    latitude: string;
    longitude: string;
    contactName: string;
    contactNumber: string;
    contactHasWhatsapp: boolean
}


export enum BranchStatus {
    Active,
    Disabled,
    Deleted
}
