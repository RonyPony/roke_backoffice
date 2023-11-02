

export interface Planning {
    id: string;
    status: PlanningStatus;
    name: string,
    StarDate: string,
    FinalDate: string,
    createOn: string,
    lastUpdate: string
}
export interface Brigade {
    id: string;
    name: string,
}

export interface branch {
    id: string;
    name: string;
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
export enum BrigadegStatus {
    Pending,
    Assigned,
    Deleted,
    Closed,
    Approved
}

export interface LocalPlanning {
    idLocation:string,
    idBrigade:string,
    StartDate:Date,
    finalDate:Date
}