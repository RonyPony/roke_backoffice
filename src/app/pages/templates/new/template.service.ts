import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocationRoke, Month, Template } from './new.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor(private http: HttpClient) { }

    GetAllMonths() {
        return this.http.get<Month[]>(`${environment.urlApi}/api/Month`);
    }
    GetAllLocations() {
        return this.http.get<LocationRoke[]>(`${environment.urlApi}/api/Location`);
    }

    GetAll() {
        return this.http.get<Template[]>(`${environment.urlApi}/api/Template`);
    }

    linkLocationToTemplate(templateId: string, locationIds: any) {
        var data = {
            "templateId": templateId,
            "locationId": locationIds
        }
        return this.http.post<Template>(`${environment.urlApi}/api/template/asign`, data);
    }

    saveTemplate(data: any) {
        return this.http.post<Template>(`${environment.urlApi}/api/Template`, data);
    }
}
