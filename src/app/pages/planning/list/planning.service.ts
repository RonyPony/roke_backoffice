import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RawPlanning } from './list.model';

@Injectable({
    providedIn: 'root'
})
export class PlanningService {

    constructor(private http: HttpClient) { }

    GetAll() {
        return this.http.get<RawPlanning[][]>(`${environment.urlApi}/api/Planning`);
    }


    savePlanning(data: any) {
        return this.http.post<any>(`${environment.urlApi}/api/Planning`, data);
    }
}
