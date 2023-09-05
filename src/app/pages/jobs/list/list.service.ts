import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<User[]>(`${environment.urlApi}/api/Usuario`);
  }

  saveUser(data: any) {
    return this.http.post<User>(`${environment.urlApi}/api/Usuario`, data);
  }
  
  editUser(id: number, data: any) {
    return this.http.put<User>(`${environment.urlApi}/api/Usuario?id=${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.urlApi}/api/Usuario/${id}`);
  }
}
