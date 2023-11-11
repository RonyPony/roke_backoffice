import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    constructor(private http: HttpClient) { }

    GetEvents() {
        return this.http.get<EventInput[]>(`${environment.urlApi}/api/Planning/calendar`);
    }

}
