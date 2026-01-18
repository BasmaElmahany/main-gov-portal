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

  excerpt(c: Company): string {
    const text = this.lang.current === 'ar' ? (c.addressAr || '') : (c.addressEn || '');
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  }

  cover(c: Company): string {
    if (c.photoUrl) {
      const baseUrl = 'https://shusha.minya.gov.eg:93';
      const path = c.photoUrl.startsWith('/') ? c.photoUrl : '/' + c.photoUrl;
      return `${baseUrl}${path}`;
    }
    return 'https://via.placeholder.com/150';
  }

  // دالة للتعامل مع أخطاء الصور
  handleImageError(event: any, company: Company): void {
    console.log('Image error for company:', company.nameAr || company.nameEn);
    event.target.src = 'https://via.placeholder.com/150';
  }

  openDetails(id: string): void {
    this.router.navigate(['/companies/details'], { state: { id } });
  }

  // دالة إضافية للتصميم: الحصول على لون عشوائي لخلفية البطاقة (اختياري)
  getCardColor(index: number): string {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];
    return colors[index % colors.length];
  }
}