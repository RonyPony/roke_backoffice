import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Ticket[]>(`${environment.urlApi}/api/Ticket`);
  }
}
