import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  URL = 'https://localhost:7070/api/user/login';

  constructor(private http: HttpClient) { }
  getConfig() : Observable<any> {
    return this.http.get<any>(`${this.URL}`)
  }
}
