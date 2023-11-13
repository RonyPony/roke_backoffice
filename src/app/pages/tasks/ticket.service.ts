import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket, TicketDetail } from './list/list.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get<Ticket[]>(`${environment.urlApi}/api/Ticket`);
  }
  getById(id:string){
    console.log("id> "+id)
    return this.http.get<TicketDetail[]>(`${environment.urlApi}/Api/Ticket${id}`)
  }

  saveTicket(data: any) {
    return this.http.post<Ticket>(`${environment.urlApi}/api/Ticket`, data);
  }
}
