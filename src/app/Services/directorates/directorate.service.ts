import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Directorate } from '../../Pages/Models/directorates';

@Injectable({
  providedIn: 'root'
})
export class DirectorateService {
  private readonly baseUrl = 'https://shusha.minya.gov.eg:93/api/Directorate';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Directorate[] }> {
    return this.http.get<{ data: Directorate[] }>(`${this.baseUrl}`);
  }

  getById(id: string): Observable<{ data: Directorate }> {
    return this.http.get<{ data: Directorate }>(`${this.baseUrl}/${id}`);
  }
}