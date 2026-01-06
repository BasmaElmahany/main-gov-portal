import { Injectable } from '@angular/core';
import { ApiResponse, GetNews } from '../../Models/news';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly apiUrl = `${baseAPI}/News`;

  constructor(private http: HttpClient) { }

  // -------------------- GET ALL --------------------
  getAll(): Observable<ApiResponse<GetNews[]>> {
    return this.http.get<ApiResponse<GetNews[]>>(this.apiUrl);
  }

  // -------------------- GET BY ID --------------------
  getById(id: string): Observable<ApiResponse<GetNews>> {
    return this.http.get<ApiResponse<GetNews>>(`${this.apiUrl}/${id}`);
  }

  // -------------------- GET BY TypeID --------------------
  getByTypeId(typeId: number): Observable<ApiResponse<GetNews[]>> {
    return this.http.get<ApiResponse<GetNews[]>>(
      `${this.apiUrl}/by-type/${typeId}`
    );
  }
}
