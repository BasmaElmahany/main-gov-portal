import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocialSocietiesService {
  private apiUrl = 'https://shusha.minya.gov.eg:93/api/SocialSocieties';

  constructor(private http: HttpClient) {}

  getAllSocialSocieties(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
