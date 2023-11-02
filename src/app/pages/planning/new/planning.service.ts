import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Month, Planning, Brigade } from './list.model';
import { Branch } from '../../branches/list/list.model';
import { TemplateDetails } from '../../templates/model';


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
    GetAllPlanningsById(id: number) {
        return this.http.get<Planning[]>(`${environment.urlApi}/api/template?id=${id}`);
    }




    GetAll() {
        return this.http.get<Planning[]>(`${environment.urlApi}/api/Planning`);
    }

    savePlanning(idTemplate: string, name: string, idMonth: string, locationInfo: any) {
        var data = {
            "name": name,
            "idMonth": idMonth,
            "idTemplate": idTemplate,
            "locationInfo": locationInfo
        }
        return this.http.post<Planning>(`${environment.urlApi}/api/Planning/Create`, data);
    }

    GetAllBranchesByTemplateId(id: string) {
        return this.http.get<TemplateDetails[]>(`${environment.urlApi}/api/template/` + id);
    }


    GetAllBrigade() {
        return this.http.get<Brigade[]>(`${environment.urlApi}/api/Brigade`);
    }
}
