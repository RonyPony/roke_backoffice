export interface Branch {
    id: string;
    status: BranchStatus;
    sucursal: string;
    latitude: string;
    longitude: string;
}

export enum BranchStatus {
    Active,
    Disabled,
    Deleted
}
