import { Injectable } from '@angular/core';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SocialSociety, SocialSocietyRead } from '../../Models/socialsocieties';

@Injectable({
  providedIn: 'root'
})
export class SocialSocietiesService {
  private readonly apiUrl = `${baseAPI}/SocialSocieties`;

  constructor(private http: HttpClient) { }

  getAllSocialSocieties() {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map(res => res.data));
  }

  getbyId(id: string) {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map(res => res.data));
  }
}
