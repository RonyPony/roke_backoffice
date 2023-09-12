import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Month, Template } from './list.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpClient) { }

    GetAllMonths() {
        return this.http.get<Month[]>(`${environment.urlApi}/api/Month`);
    }

    GetAll() {
        return this.http.get<Template[]>(`${environment.urlApi}/api/Template`);
    }


    saveTemplate(data: any) {
        return this.http.post<Template>(`${environment.urlApi}/api/Template`, data);
    }
}
