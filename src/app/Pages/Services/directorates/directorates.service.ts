import { Injectable } from '@angular/core';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DirectorateRead } from '../../Models/directorates';
import { ApiResponse } from '../../Models/govtours';

@Injectable({
  providedIn: 'root'
})
export class DirectoratesService {
  private readonly apiUrl = `${baseAPI}/Directorate`;

  constructor(private http: HttpClient) { }
  getAllDirectorates() {
    return this.http
      .get<ApiResponse<DirectorateRead[]>>(this.apiUrl)
      .pipe(map(res => res.data));
  }

  getbyId(id: string) {
    return this.http
      .get<ApiResponse<DirectorateRead>>(`${this.apiUrl}/${id}`)
      .pipe(map(res => res.data));
  }
}
