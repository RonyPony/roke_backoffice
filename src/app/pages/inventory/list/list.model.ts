export interface Inventory {
    id: string;
    sucursal: string;
    ItemCode: string;
    status: Status;
    Serial: string;
    UbicacionInterna: string;
    Capacidad: string;
    Marca: string;
    refrigerante: string
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

export enum Status {
    Active,
    Disabled,
    Deleted
}