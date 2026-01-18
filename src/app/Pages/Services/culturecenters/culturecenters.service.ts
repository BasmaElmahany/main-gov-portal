import { Injectable } from '@angular/core';
import { baseAPI } from '../../../../Environment/env';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CultureCenter, CultureCenterRead } from '../../Models/culturecenters';
// You can define ApiResponse if needed, or use any

@Injectable({
	providedIn: 'root'
})
export class CultureCentersService {
	private readonly apiUrl = `${baseAPI}/CultureCenters`;

	constructor(private http: HttpClient) { }

	getAllCultureCenters() {
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
