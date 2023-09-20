import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Template } from './list.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpClient) { }

    GetAll() {
        return this.http.get<Template[]>(`${environment.urlApi}/api/template`);
    }


    saveTemplate(data: any) {
        return this.http.post<Template>(`${environment.urlApi}/api/Template`, data);
    }
}
