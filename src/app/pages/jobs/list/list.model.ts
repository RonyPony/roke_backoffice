export interface User {
  id: string;
  idUser: number;
  nombre: string;
  apellido: string;
  cedula: string;

  statusuario: UsuarioStatus;
  contacto: string;    
  username: string;
  password: string;
  rol: string;
}

export enum UsuarioStatus {
  Active,
  disabled,
  Deleted
}