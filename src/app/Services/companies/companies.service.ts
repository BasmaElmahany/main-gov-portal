import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../../Pages/company/Models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly baseUrl = 'https://shusha.minya.gov.eg:93/api/Company';

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<{ data: Company[] }> {
    return this.http.get<{ data: Company[] }>(`${this.baseUrl}`);
  }

  getCompanyById(id: string): Observable<{ data: Company }> {
    return this.http.get<{ data: Company }>(`${this.baseUrl}/${id}`);
  }

  get baseUrlValue(): string {
    return this.baseUrl;
  }
}