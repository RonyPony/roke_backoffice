export interface Ticket {
    id: string;
    status: TicketStatus;
    createdOn: string;
    updatedOn: string;
    description: string;
    ticketType: string;
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

export interface TicketDetail {
  id: string
  status: number
  createdOn: string
  updatedOn: string
  description: string
  ticketType: string
  contactName: string
  contactNumber: string
  contactHasWhatsapp: boolean
  locationId: string
  assignedUserId: string
  photoId1: string
  photoId2: string
  photoId3: string
}
