import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../../Shared/Services/language.service';
import { CompaniesService } from '../../../../Services/companies/companies.service';
import { Company } from '../../Models/company';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  loading = true;
  companies: Company[] = [];

  constructor(
    private companiesService: CompaniesService,
    public lang: LanguageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // اللوجيك البسيط: استلام البيانات كما هي وعرضها
    this.companiesService.getAllCompanies().subscribe({
      next: (res) => {
        this.companies = res.data;
        this.loading = false;
        console.log('Companies data:', res);
      },
      error: () => (this.loading = false)
    });
  }

  title(c: Company): string {
    return this.lang.current === 'ar' ? c.nameAr : c.nameEn;
  }

  // لوجيك الـ Excerpt (الاختصار) زي جولات المحافظ
  excerpt(c: Company): string {
    const text = this.lang.current === 'ar' ? (c.addressAr || '') : (c.addressEn || '');
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  }

  // لوجيك الـ Cover: بناء الرابط مرة واحدة فقط وبطريقة آمنة
  cover(c: Company): string {
    if (c.photoUrl) {
      // نستخدم رابط السيرفر مباشرة ونضمن عدم وجود سلاش مزدوجة
      const baseUrl = 'https://shusha.minya.gov.eg:93';
      const path = c.photoUrl.startsWith('/') ? c.photoUrl : '/' + c.photoUrl;
      return `${baseUrl}${path}`;
    }
    // صورة احتياطية من الإنترنت لو الـ assets عندك فيها مشكلة 404
    return 'https://via.placeholder.com/150';
  }

  openDetails(id: string): void {
    this.router.navigate(['/companies/details'], { state: { id } });
  }
}