import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Month, Planning, Brigade } from './list.model';


@Injectable({
    providedIn: 'root'
})
export class PlanningService {

    constructor(private http: HttpClient) { }

    GetAllMonths() {
        return this.http.get<Month[]>(`${environment.urlApi}/api/Month`);
    }

    GetAllPlannings() {
        return this.http.get<Planning[]>(`${environment.urlApi}/api/template`);
    }

    GetAll() {
        return this.http.get<Planning[]>(`${environment.urlApi}/api/Planning`);
    }

    savePlanning(idTemplate: string, idBrigade: any, name: string, StartDate: string, finalDate: string, idMonth: string) {
        var data = {
            "name": name,
            "idTemplate": idTemplate,
            "idBrigade": idBrigade,
            "StartDate": StartDate,
            "finalDate": finalDate,
            "idMonth": idMonth
        }
        return this.http.post<Planning>(`${environment.urlApi}/api/Planning/Create`, data);
    }

   
    GetAllBrigade() {
        return this.http.get<Brigade[]>(`${environment.urlApi}/api/Brigade`);
      }
}