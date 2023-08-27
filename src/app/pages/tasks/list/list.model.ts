export interface Ticket {
    id: string;
    status: TicketStatus;
    createdOn: string;
    updatedOn: string;
    description: string;
    ticketTypeId: string;
    contactName: string;
    contactNumber: string;
    contactHasWhatsapp: boolean;
}

export enum TicketStatus {
    Pending,
    Assigned,
    Deleted,
    Closed,
    Approved
}