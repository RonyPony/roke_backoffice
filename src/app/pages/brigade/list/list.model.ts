export interface Brigade {
    id: string;
    status: BrigadeStatus;
    name: string;
    creationDate: string;
    lastUpdate: string;
}

export interface BrigadeUser {

    id: string,
    nombre: string,
    apellido: string,
    cedula: string,
    contacto: string,
    rol: string,
    status: string,
    username: string

}


export enum BrigadeStatus {
    Active,
    Disabled,
    Deleted
}
