export interface Brigade {
    id: string;
    status: BrigadeStatus;
    name: string;
    creationDate: string;
    lastUpdate: string;
}


export enum BrigadeStatus {
    Active,
    Disabled,
    Deleted
}
