import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Branch } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Branch[]>(`${environment.urlApi}/api/location`);
  }

  saveBranch(data: any) {
    return this.http.post<Branch>(`${environment.urlApi}/api/location`, data);
  }
}
