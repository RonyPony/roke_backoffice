export interface Planning {
    id: string;
    status: PlanningStatus;
    name: string,
    createOn: string,
    lastUpdate: string
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