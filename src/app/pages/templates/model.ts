export interface Template {
    id: string;
    name: string;
    status: TemplateStatus;
    createdOn: string;
    updatedOn: string;
    description: string;
    TemplateType: string;
    contactName: string;
    contactNumber: string;
    contactHasWhatsapp: boolean;
}

export interface LocationRoke {
    id: string;
    sucursal: string;
    latitude: string;
    longitude: string;
    status: string;
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