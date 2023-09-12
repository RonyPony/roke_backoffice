export interface Template {
    id: string;
    status: TemplateStatus;
    createdOn: string;
    updatedOn: string;
    description: string;
    TemplateType: string;
    contactName: string;
    contactNumber: string;
    contactHasWhatsapp: boolean;
}

export interface Month {
    id: string;
    month: TemplateStatus;
}

export enum TemplateStatus {
    Pending,
    Assigned,
    Deleted,
    Closed,
    Approved
}