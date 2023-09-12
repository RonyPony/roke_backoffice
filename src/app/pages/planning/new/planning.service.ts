import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Month, Planning } from './list.model';

@Injectable({
    providedIn: 'root'
})
export class PlanningService {

    constructor(private http: HttpClient) { }

    GetAllMonths() {
        return this.http.get<Month[]>(`${environment.urlApi}/api/Month`);
    }

    GetAll() {
        return this.http.get<Planning[]>(`${environment.urlApi}/api/Planning`);
    }


    savePlanning(data: any) {
        return this.http.post<Planning>(`${environment.urlApi}/api/Planning`, data);
    }
}
