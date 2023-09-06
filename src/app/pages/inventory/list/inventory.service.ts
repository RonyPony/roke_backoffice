import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventory } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Inventory[]>(`${environment.urlApi}/api/inventory`);
  }

  saveInventory(data: any) {
    return this.http.post<Inventory>(`${environment.urlApi}/api/inventory`, data);
  }
}
