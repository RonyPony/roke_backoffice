import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Template } from './details.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpClient) { }

    GetById(id: any) {
        return this.http.get<Template>(`${environment.urlApi}/api/template/` + id);
    }
}
