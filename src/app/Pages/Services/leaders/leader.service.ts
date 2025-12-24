import { Injectable } from '@angular/core';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leader } from '../../Models/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  private apiUrl = `${baseAPI}/Leaders`;


  constructor(private http: HttpClient) { }

  getLeaders(): Observable<{ msg: string; data: Leader[] }> {
    return this.http.get<{ msg: string; data: Leader[] }>(this.apiUrl);
  }

  getLeaderById(id: string): Observable<Leader> {
    return this.http.get<Leader>(`${this.apiUrl}/${id}`);
  }
}
