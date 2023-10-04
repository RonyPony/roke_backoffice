import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brigade } from './list/list.model';

@Injectable({
  providedIn: 'root'
})
export class BrigadeService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Brigade[]>(`${environment.urlApi}/api/Brigade`);
  }

  saveBrigade(data: any) {
    return this.http.post<Brigade>(`${environment.urlApi}/api/Brigade`, data);
  }
  updateBrigade(data: any, id: any) {
    return this.http.put<Brigade>(`${environment.urlApi}/api/Brigade/${id}`, data);
  }
  deleteBrigade(id: any) {
    return this.http.delete<string>(`${environment.urlApi}/api/Brigade/${id}`);
  }
  getTechnichian() {
    return this.http.delete<string>(`${environment.urlApi}/api/Brigade`);
  }
}
