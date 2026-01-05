import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../../Shared/Services/language.service';
import { DirectoratesService } from '../../../Services/directorates/directorates.service';
import { Directorate } from '../../../Models/directorates';

@Component({
  selector: 'app-directorates',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './directorates.component.html',
  styleUrls: ['./directorates.component.scss']
})
export class DirectoratesComponent implements OnInit {
  loading = true;
  directorates: Directorate[] = [];

  constructor(
    private directoratesService: DirectoratesService,
    public lang: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.directoratesService.getAllDirectorates().subscribe({
      next: (res: any) => {
        // بما إن الـ Log بيقول إن res هي الـ Array علطول:
        this.directorates = res; 
        this.loading = false;
        console.log('Success! Data loaded:', this.directorates);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.loading = false;
      }
    });
  }

  // استخدمنا nameAr و nameEn زي ما ظهر في الـ Console
  title(d: Directorate): string {
    return this.lang.current === 'ar' ? (d.nameAr || '') : (d.nameEn || '');
  }

  excerpt(d: Directorate): string {
    const text = this.lang.current === 'ar' 
      ? (d.descriptionAr || d.addressAr || '') 
      : (d.descriptionEn || d.addressEn || '');
    return text.length > 180 ? text.slice(0, 180) + '...' : text;
  }

  cover(d: Directorate): string {
    return d.photoUrl 
      ? `https://shusha.minya.gov.eg:93${d.photoUrl}` 
      : 'assets/placeholder.jpg';
  }

  openDetails(id: string): void {
    this.router.navigate(['/directorates/details'], { state: { id } });
  }
}