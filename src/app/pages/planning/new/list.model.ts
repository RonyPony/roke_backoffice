export interface Planning {
    id: string;
    status: PlanningStatus;
    createdOn: string;
    updatedOn: string;
    description: string;
    PlanningType: string;
    contactName: string;
    contactNumber: string;
    contactHasWhatsapp: boolean;
}

export interface Month {
    id: string;
    month: PlanningStatus;
}

export enum PlanningStatus {
    Pending,
    Assigned,
    Deleted,
    Closed,
    Approved
}