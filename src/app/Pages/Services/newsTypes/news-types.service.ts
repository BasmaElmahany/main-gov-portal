import { Injectable } from '@angular/core';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, NewsTypes } from '../../Models/news';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsTypesService {

 private readonly apiUrl = `${baseAPI}/NewsTypes`;

  constructor(private http: HttpClient) { }

  getAllNewsTypes(): Observable<NewsTypes[]> {
    return this.http
      .get<ApiResponse<NewsTypes[]>>(this.apiUrl)
      .pipe(map(res => res.data));
  }

  getbyId(id: string): Observable<NewsTypes> {
    return this.http
      .get<ApiResponse<NewsTypes>>(`${this.apiUrl}/${id}`)
      .pipe(map(res => res.data));
  }
}
