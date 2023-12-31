import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brigade, BrigadeUser } from './list/list.model';

@Injectable({
  providedIn: 'root'
})
export class BrigadeService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Brigade[]>(`${environment.urlApi}/api/Brigade`);
  }

  getAllTech(){
    return this.http.get<BrigadeUser[]>(`${environment.urlApi}/api/Usuario/tech`);
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
  GetAllTech() {
    return this.http.get<BrigadeUser[]>(`${environment.urlApi}/api/Usuario`);
  }
  asinTech(brigadeId: string, tecnicosId: any) {
    var data = {
        "brigadeId": brigadeId,
        "tecnicosId": tecnicosId
    }
    return this.http.post<Brigade>(`${environment.urlApi}/api/Brigade/asign`, data);
}

}
