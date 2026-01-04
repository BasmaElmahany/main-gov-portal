import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { GovToursService } from '../Services/govTours/gov-tours.service';
import { LanguageService } from '../../Shared/Services/language.service';
import { GetGovTours } from '../Models/govtours';

@Component({
  selector: 'app-gov-tours',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,RouterModule],
  templateUrl: './gov-tours.component.html',
  styleUrl: './gov-tours.component.scss'
})
export class GovToursComponent implements OnInit {

  loading = true;
  tours: GetGovTours[] = [];

  constructor(
    private govTourService: GovToursService,
    public lang: LanguageService,  private router: Router
  ) {}

  ngOnInit(): void {
    this.govTourService.getAll().subscribe({
      next: res => {
        this.tours = res.data;
        this.loading = false;
        console.log(res);  
      },
      error: () => this.loading = false
    });
  }

  title(t: GetGovTours): string {
    return this.lang.current === 'ar' ? t.titleAr : t.titleEn;
  }

  excerpt(t: GetGovTours): string {
    const text = this.lang.current === 'ar' ? t.articleAr : t.articleEn;
    return text.length > 180 ? text.slice(0, 180) + '...' : text;
  }

  cover(t: GetGovTours): string {

    return t.photos?.length
      ?`https://shusha.minya.gov.eg:93${t.photos[0].photoUrl}`
      : '/assets/placeholder.jpg';
  }
  formatDate(date: string): string {
  const locale = this.lang.current === 'ar' ? 'ar-EG' : 'en-US';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

openDetails(id: string): void {
  this.router.navigate(
    ['/gov-tours/details'],
    { state: { id } }
  );
}
}