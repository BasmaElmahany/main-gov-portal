import { Injectable } from '@angular/core';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, GetGovTours } from '../../Models/govtours';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovToursService {

  private readonly apiUrl = `${baseAPI}/GovTours`;

  constructor(private http: HttpClient) {}

  // -------------------- GET ALL --------------------
  getAll(): Observable<ApiResponse<GetGovTours[]>> {
    return this.http.get<ApiResponse<GetGovTours[]>>(this.apiUrl);
  }

  // -------------------- GET BY ID --------------------
  getById(id: string): Observable<ApiResponse<GetGovTours>> {
    return this.http.get<ApiResponse<GetGovTours>>(`${this.apiUrl}/${id}`);
  }

}
